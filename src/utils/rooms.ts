import {
  type Room,
  type MatrixClient,
  EventType,
  HistoryVisibility,
  JoinRule,
  type MatrixEvent,
  MsgType,
  type IContent,
  Preset,
  Visibility,
} from "matrix-js-sdk"
import {
  assert,
  getFileUrl,
  getImageUrl,
  normalizeName,
  stringToColor,
  stringToEmoji,
} from "./util"
import {type RosterUserData} from "@/containers/Roster/RosterUser"
import {
  getOwnersIdWithPowerLevels,
  getUserLastPresence,
  isCurrentUserAdminOrMod,
  UserPowerLevel,
} from "./members"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {
  type AnyMessage,
  MessageKind,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {RoomType} from "@/components/Room"
import {type IconType} from "react-icons"
import {
  IoAtCircle,
  IoLockClosed,
  IoPencil,
  IoPeopleCircle,
  IoPersonCircle,
  IoReceipt,
} from "react-icons/io5"
import {IoIosPaper, IoIosText} from "react-icons/io"
import {type MessageBaseData} from "@/components/MessageContainer"
import {parseReplyMessageFromBody, validateReplyMessage} from "./parser"
import {
  type EventGroupMessageData,
  EventShortenerType,
} from "@/components/EventGroupMessage"
import {type EventMessageData} from "@/components/EventMessage"
import {type GroupedMembers} from "@/containers/Roster/hooks/useRoomMembers"
import {t} from "./lang"
import {LangKey} from "@/lang/allKeys"

export enum ImageSizes {
  Server = 47,
  MessageAndProfile = 40,
  ProfileLarge = 60,
}

// Initial event that declares the room as encrypted.
const ROOM_ENCRYPTION_OBJECT = {
  type: "m.room.encryption",
  state_key: "",
  content: {
    algorithm: "m.megolm.v1.aes-sha2",
  },
}

function getVisibilityFromPrivacy(privacy: string): Visibility {
  if (privacy === Visibility.Public) {
    return Visibility.Public
  } else if (privacy === Visibility.Private) {
    return Visibility.Private
  }

  throw new Error("Room privacy invalid.")
}

export type RoomCreationProps = {
  name: string
  privacy: string
  enableEncryption: boolean
  description?: string
  // When privacy is public.
  address?: string
}

export async function createRoom(
  client: MatrixClient,
  props: RoomCreationProps
): Promise<{
  room_id: string
}> {
  const {name, description, enableEncryption, address, privacy} = props

  const visibility = getVisibilityFromPrivacy(privacy)

  assert(name.length > 0, "Room name should not be empty.")

  if (description !== undefined) {
    assert(description.length > 0, "Room description should not be empty.")
  }

  if (visibility === Visibility.Public) {
    assert(
      address !== undefined && address.length > 0,
      "If visibility is public, it must have at least one valid address"
    )

    const result = await client.publicRooms({
      filter: {
        generic_search_term: address,
      },
      include_all_networks: true,
      limit: 1,
    })

    if (result.chunk.length === 0) {
      throw new Error("That address is already taken.")
    }
  }

  return await client.createRoom({
    name,
    topic: description,
    visibility,
    preset: enableEncryption ? Preset.PrivateChat : Preset.PublicChat,
    room_alias_name: address,
    initial_state: enableEncryption ? [ROOM_ENCRYPTION_OBJECT] : undefined,
  })
}

export async function getAllJoinedRooms(
  client: MatrixClient
): Promise<PartialRoom[]> {
  const currentJoinedRooms: PartialRoom[] = []
  const directRoomIds = getDirectRoomsIds(client)

  try {
    const joinedRooms = await client.getJoinedRooms()

    for (const joinedRoomId of joinedRooms.joined_rooms) {
      const joinedRoom = client.getRoom(joinedRoomId)

      // TODO: Handle errors instead continue.
      if (joinedRoom === null) {
        continue
      }

      if (joinedRoom.isSpaceRoom()) {
        continue
      }

      currentJoinedRooms.push({
        roomId: joinedRoom.roomId,
        roomName: joinedRoom.name,
        type: directRoomIds.includes(joinedRoomId)
          ? RoomType.Direct
          : RoomType.Group,
        emoji: stringToEmoji(joinedRoomId),
      })
    }
  } catch (error) {
    console.error("An error ocurred while getting all joined rooms", error)
  }

  return currentJoinedRooms
}

const FETCH_MEMBERS_LIMIT = 30
const PRESENCE_MAX = 30

export async function getRoomMembers(room: Room): Promise<GroupedMembers> {
  const membersResponse = await room.client.getJoinedRoomMembers(room.roomId)
  const roomScrollBack = await room.client.scrollback(room, PRESENCE_MAX)

  const members: RosterUserData[] = []
  const moderators: RosterUserData[] = []
  const admins: RosterUserData[] = []

  const roomOwnersWithLevels = getOwnersIdWithPowerLevels(room)

  for (const roomOwner of roomOwnersWithLevels) {
    const roomOwnerMember = membersResponse.joined[roomOwner.userId]

    if (roomOwnerMember === undefined) {
      continue
    }

    const name = roomOwnerMember.display_name ?? roomOwner.userId

    const lastPresence = await getUserLastPresence(
      roomScrollBack,
      PRESENCE_MAX,
      roomOwner.userId
    )

    const roomOwnerProps: RosterUserData = {
      displayName: normalizeName(name),
      userId: roomOwner.userId,
      lastPresenceAge: lastPresence ?? undefined,
      powerLevel: roomOwner.powerLevel,
      avatarUrl: getImageUrl(
        roomOwnerMember.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
    }

    if (roomOwner.powerLevel === UserPowerLevel.Admin) {
      admins.push(roomOwnerProps)
    } else if (roomOwner.powerLevel === UserPowerLevel.Moderator) {
      moderators.push(roomOwnerProps)
    }
  }

  let memberCount = 0

  for (const joinedMemberId in membersResponse.joined) {
    if (memberCount >= FETCH_MEMBERS_LIMIT) {
      break
    }

    const member = membersResponse.joined[joinedMemberId]

    const isRoomOwner = roomOwnersWithLevels.some(
      memberWithLevels => memberWithLevels.userId === joinedMemberId
    )

    if (member === undefined || isRoomOwner) {
      continue
    }

    const name = member.display_name ?? joinedMemberId

    const lastPresence = await getUserLastPresence(
      roomScrollBack,
      PRESENCE_MAX,
      joinedMemberId
    )

    members.push({
      displayName: normalizeName(name),
      powerLevel: UserPowerLevel.Member,
      userId: joinedMemberId,
      lastPresenceAge: lastPresence ?? undefined,
      avatarUrl: getImageUrl(
        member.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
    })

    memberCount += 1
  }

  return {
    admins,
    moderators,
    members,
  }
}

// #region Direct rooms
export function getDirectRoomsIds(client: MatrixClient): string[] {
  const directRooms = client.getAccountData(EventType.Direct)
  const content = directRooms?.event.content

  if (content === undefined) {
    return []
  }

  return Object.values(content).flat()
}

export function isDirectRoom(client: MatrixClient, roomId: string): boolean {
  const directRoomIds = getDirectRoomsIds(client)

  return directRoomIds.includes(roomId)
}

export function getPartnerUserIdFromRoomDirect(room: Room): string {
  assert(
    room.getJoinedMemberCount() === 2,
    "Direct chat must have exactly two participants."
  )

  const userId = room
    .getJoinedMembers()
    .find(member => member.userId !== room.myUserId)?.userId

  assert(
    userId !== undefined,
    "If one participant is the current user, the other must exist."
  )

  return userId
}

const SCROLLBACK_MAX = 30

// #region Events
export const handleRoomEvents = async (
  activeRoom: Room
): Promise<AnyMessage[]> => {
  const client = activeRoom.client
  const roomHistory = await client.scrollback(activeRoom, SCROLLBACK_MAX)
  const events = roomHistory.getLiveTimeline().getEvents()
  const allMessageProperties: AnyMessage[] = []

  for (const event of events) {
    const messageProperties = await handleRoomMessageEvent(event, roomHistory)

    if (messageProperties === null) {
      continue
    }

    allMessageProperties.push(messageProperties)

    await client.sendReadReceipt(event)
  }

  return groupEventMessage(allMessageProperties)
}

const configRoomPattern = new Set<string>([
  EventType.RoomTopic,
  EventType.RoomAvatar,
  EventType.RoomName,
  EventType.RoomEncryption,
  EventType.RoomCanonicalAlias,
  EventType.RoomGuestAccess,
  EventType.RoomJoinRules,
  EventType.RoomHistoryVisibility,
  EventType.RoomCreate,
  EventType.RoomJoinRules,
])

const processPatterns = (
  lastMessage: EventMessageData,
  currentMessage: EventMessageData
): AnyMessage | null => {
  if (lastMessage.sender.userId !== currentMessage.sender.userId) {
    return null
  }

  if (
    configRoomPattern.has(lastMessage.type) &&
    configRoomPattern.has(currentMessage.type)
  ) {
    return {
      kind: MessageKind.EventGroup,
      messageId: lastMessage.eventId,
      data: {
        eventMessages: [lastMessage, currentMessage],
        eventGroupMainBody: {
          sender: lastMessage.sender,
          shortenerType: EventShortenerType.ConfigureRoom,
        },
      },
    }
  } else if (configRoomPattern.has(currentMessage.type)) {
    return null
  }

  return {
    kind: MessageKind.EventGroup,
    messageId: lastMessage.eventId,
    data: {
      eventMessages: [lastMessage, currentMessage],
      eventGroupMainBody: {
        sender: lastMessage.sender,
        shortenerType: EventShortenerType.EqualInfo,
      },
    },
  }
}

const updateEventGroup = (
  eventGroup: EventGroupMessageData,
  newEvent: EventMessageData
): AnyMessage | null => {
  if (eventGroup.eventGroupMainBody.sender.userId !== newEvent.sender.userId) {
    return null
  }

  const partialMessage: AnyMessage = {
    kind: MessageKind.EventGroup,
    messageId: newEvent.eventId,
    data: {
      eventMessages: [...eventGroup.eventMessages, newEvent],
      eventGroupMainBody: eventGroup.eventGroupMainBody,
    },
  }

  switch (eventGroup.eventGroupMainBody.shortenerType) {
    case EventShortenerType.EqualInfo: {
      if (configRoomPattern.has(newEvent.type)) {
        return null
      }

      return partialMessage
    }
    case EventShortenerType.PersonalInfo: {
      throw new Error(
        "Not implemented yet: EventShortenerType.PersonalInfo case"
      )
    }
    case EventShortenerType.ConfigureRoom: {
      if (!configRoomPattern.has(newEvent.type)) {
        return null
      }

      return partialMessage
    }
  }
}

const groupEventMessage = (anyMessages: AnyMessage[]): AnyMessage[] => {
  const result: AnyMessage[] = []

  for (const message of anyMessages) {
    const lastMessage = result.at(-1)

    if (lastMessage === undefined) {
      result.push(message)

      continue
    }

    const isLastMessageEvent = lastMessage.kind === MessageKind.Event
    const isMessageEvent = message.kind === MessageKind.Event

    if (isLastMessageEvent && isMessageEvent) {
      const newEventGroup = processPatterns(lastMessage.data, message.data)

      if (newEventGroup === null) {
        result.push(message)

        continue
      }

      result[result.length - 1] = newEventGroup
    } else if (lastMessage.kind === MessageKind.EventGroup && isMessageEvent) {
      const eventGroupUpdated = updateEventGroup(lastMessage.data, message.data)

      if (eventGroupUpdated === null) {
        result.push(message)

        continue
      }

      result[result.length - 1] = eventGroupUpdated
    } else {
      result.push(message)
    }
  }

  return result
}

export const handleRoomMessageEvent = async (
  event: MatrixEvent,
  room: Room
): Promise<AnyMessage | null> => {
  if (event.getType() === EventType.RoomMessage) {
    return await handleMessage(event, room)
  }

  const eventMessageData = await handleEventMessage(event)

  // TODO: Handle errors instead of throwing null.
  if (
    event.sender === null ||
    event.event.event_id === undefined ||
    eventMessageData === null
  ) {
    return null
  }

  return {
    kind: MessageKind.Event,
    messageId: event.event.event_id,
    data: {
      eventId: event.event.event_id,
      timestamp: event.localTimestamp,
      body: eventMessageData.body,
      icon: eventMessageData.icon ?? undefined,
      type: event.getType(),
      sender: {
        displayName: event.sender.name,
        userId: event.sender.userId,
      },
    },
  }
}

type EventMessagePartial = {
  body: string
  icon: IconType | null
}

export async function handleEventMessage(
  event: MatrixEvent
): Promise<EventMessagePartial | null> {
  const eventContent = event.getContent()

  switch (event.getType()) {
    case EventType.RoomMember: {
      return handleMemberEvent(
        event.getStateKey(),
        eventContent,
        event.getPrevContent()
      )
    }
    case EventType.RoomTopic: {
      return await handleRoomTopicEvent(eventContent)
    }
    case EventType.RoomGuestAccess: {
      return await handleGuestAccessEvent(eventContent)
    }
    case EventType.RoomHistoryVisibility: {
      return await handleHistoryVisibilityEvent(eventContent)
    }
    case EventType.RoomJoinRules: {
      return await handleJoinRulesEvent(eventContent)
    }
    case EventType.RoomCanonicalAlias: {
      return await handleRoomCanonicalAliasEvent(eventContent)
    }
    case EventType.RoomAvatar: {
      return await handleRoomAvatarEvent(eventContent)
    }
    case EventType.RoomName: {
      return await handleRoomNameEvent(eventContent)
    }
    default: {
      return null
    }
  }
}

export const handleMemberEvent = (
  stateKey: string | undefined,
  eventContent: IContent,
  previousContent: IContent
): EventMessagePartial | null => {
  const displayName = eventContent.displayname
  const previousMembership = previousContent.membership
  const previousDisplayName = previousContent.displayname

  switch (eventContent.membership) {
    case KnownMembership.Join: {
      return handleMemberJoin(eventContent, previousContent)
    }
    case KnownMembership.Invite: {
      return {
        icon: IoPeopleCircle,
        body:
          displayName === undefined
            ? stateKey === undefined
              ? t(LangKey.Invited)
              : t(LangKey.Invited, stateKey)
            : t(LangKey.Invited, displayName),
      }
    }
    case KnownMembership.Ban: {
      if (previousDisplayName === undefined) {
        return null
      }

      return {
        icon: IoPeopleCircle,
        body:
          typeof eventContent.reason !== "string" ||
          eventContent.reason.length === 0
            ? t(LangKey.Banned, previousDisplayName)
            : t(
                LangKey.BannedByReason,
                previousDisplayName,
                eventContent.reason
              ),
      }
    }
    case KnownMembership.Leave: {
      const memberLeaveBody = handleMemberLeave(
        stateKey,
        eventContent,
        previousMembership
      )

      if (memberLeaveBody === null) {
        return null
      }

      return {
        body: memberLeaveBody,
        icon: IoPeopleCircle,
      }
    }

    default: {
      console.warn("Unknown membership type:", eventContent.membership)
    }
  }

  return null
}

function handleMemberJoin(
  eventContent: IContent,
  previousContent: IContent
): EventMessagePartial | null {
  const displayName = eventContent.displayname
  const previousMembership = previousContent.membership
  const previousDisplayName = previousContent.displayname

  if (
    previousMembership === KnownMembership.Invite ||
    previousMembership !== KnownMembership.Join
  ) {
    return {
      body: t(LangKey.JoinedToTheRoom),
      icon: IoPeopleCircle,
    }
  } else if (
    previousDisplayName !== undefined &&
    displayName !== previousDisplayName
  ) {
    return {
      icon: IoPeopleCircle,
      body:
        displayName === undefined
          ? t(LangKey.ChangeName)
          : t(LangKey.ChangeNameTo, displayName),
    }
  } else if (
    eventContent.avatar_url !== undefined &&
    previousContent?.avatar_url === undefined
  ) {
    return {
      body: t(LangKey.PutProfilePhoto),
      icon: IoPeopleCircle,
    }
  } else if (
    eventContent.avatar_url !== undefined &&
    eventContent.avatar_url !== previousContent?.avatar_url
  ) {
    return {
      body: t(LangKey.ChangeProfilePhoto),
      icon: IoPeopleCircle,
    }
  } else if (
    eventContent.avatar_url === undefined &&
    previousContent?.avatar_url !== undefined
  ) {
    return {
      body: t(LangKey.RemoveProfilePhoto),
      icon: IoPeopleCircle,
    }
  } else {
    console.warn("Unknown event for membership:", eventContent)

    return null
  }
}

function handleMemberLeave(
  stateKey: string | undefined,
  eventContent: IContent,
  previousMembership?: string
): string | null {
  switch (previousMembership) {
    case KnownMembership.Invite: {
      const userForCanceled = eventContent.displayname ?? stateKey

      if (userForCanceled === undefined) {
        return null
      }

      return t(LangKey.CanceledInvitation, userForCanceled)
    }
    case KnownMembership.Ban: {
      if (stateKey === undefined) {
        return null
      }

      return t(LangKey.MembershipBanFrom, stateKey)
    }
    case KnownMembership.Join: {
      return t(LangKey.MembershipJoin)
    }
    default: {
      console.warn("Unknown previousMembership type:", eventContent.membership)

      return null
    }
  }
}

export const handleGuestAccessEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  switch (eventContent.guest_access) {
    case "can_join": {
      return {
        body: t(LangKey.GuessAccessCanJoin),
        icon: IoLockClosed,
      }
    }
    case "forbidden": {
      return {
        body: t(LangKey.GuessAccessForbidden),
        icon: IoLockClosed,
      }
    }
    case "restricted": {
      return {
        body: t(LangKey.GuessAccessRestricted),
        icon: IoLockClosed,
      }
    }
    case "knock": {
      return {
        body: t(LangKey.GuessAccessKnock),
        icon: IoLockClosed,
      }
    }
    default: {
      console.warn("Unknown guest access type:", eventContent.guest_access)

      return null
    }
  }
}

export const handleJoinRulesEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  switch (eventContent.join_rule) {
    case JoinRule.Invite: {
      return {
        body: t(LangKey.JoinRuleInvite),
        icon: IoIosPaper,
      }
    }
    case JoinRule.Public: {
      return {
        body: t(LangKey.JoinRulePublic),
        icon: IoIosPaper,
      }
    }
    case JoinRule.Restricted: {
      return {
        body: t(LangKey.JoinRuleRestricted),
        icon: IoIosPaper,
      }
    }
    default: {
      console.warn("Unknown join rule:", eventContent.join_rule)

      return null
    }
  }
}

export const handleRoomTopicEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  const topic = eventContent.topic

  return {
    icon: IoIosText,
    body:
      topic === undefined || typeof topic !== "string" || topic.length === 0
        ? t(LangKey.RemoveTopic)
        : t(LangKey.ChangeTopicTo, topic),
  }
}

export const handleHistoryVisibilityEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  switch (eventContent.history_visibility) {
    case HistoryVisibility.Shared: {
      return {
        icon: IoReceipt,
        body: t(LangKey.HistoryVisibilityShared),
      }
    }
    case HistoryVisibility.Invited: {
      return {
        icon: IoReceipt,
        body: t(LangKey.HistoryVisibilityInvited),
      }
    }
    case HistoryVisibility.Joined: {
      return {
        icon: IoReceipt,
        body: t(LangKey.HistoryVisibilityJoined),
      }
    }
    case HistoryVisibility.WorldReadable: {
      return {
        icon: IoReceipt,
        body: t(LangKey.HistoryVisibilityWorldReadable),
      }
    }
    default: {
      console.warn(
        "Unknown history visibility:",
        eventContent.history_visibility
      )

      return null
    }
  }
}

export const handleRoomCanonicalAliasEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  return {
    icon: IoAtCircle,
    body:
      eventContent.alias === undefined || typeof eventContent.alias !== "string"
        ? t(LangKey.RemoveMainAddress)
        : t(LangKey.SetMainAddressAs, eventContent.alias),
  }
}

export const handleRoomAvatarEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  return {
    icon: IoPersonCircle,
    body:
      eventContent.url === undefined ||
      typeof eventContent.url !== "string" ||
      eventContent.url.length === 0
        ? t(LangKey.RemoveAvatar)
        : t(LangKey.ChangeAvatar),
  }
}

export const handleRoomNameEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  return {
    icon: IoPencil,
    body:
      eventContent.name === undefined ||
      typeof eventContent.name !== "string" ||
      eventContent.name.length === 0
        ? t(LangKey.RoomNameChange)
        : t(LangKey.RoomNameChangeTo, eventContent.name),
  }
}

export const handleMessage = async (
  event: MatrixEvent,
  room: Room
  // TODO: Resolve this problem
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Promise<AnyMessage | null> => {
  const sender = event.sender
  const eventContent = event.getContent()
  const isAdminOrModerator = isCurrentUserAdminOrMod(room)
  const isMessageOfMyUser = room.myUserId === sender?.userId
  const eventId = event.event.event_id

  if (sender === null || eventId === undefined) {
    return null
  }

  const messageBaseProperties: MessageBaseData = {
    authorDisplayName: sender.name,
    authorDisplayNameColor: stringToColor(sender.userId),
    timestamp: event.localTimestamp,
    messageId: eventId,
    canDeleteMessage: isAdminOrModerator || isMessageOfMyUser,
    userId: sender.userId,
    authorAvatarUrl: getImageUrl(
      sender.getMxcAvatarUrl(),
      room.client,
      ImageSizes.MessageAndProfile
    ),
  }

  switch (eventContent.msgtype) {
    case MsgType.Text: {
      const relates = eventContent["m.relates_to"]

      if (relates !== undefined) {
        const reply = relates["m.in_reply_to"]

        if (
          reply !== undefined &&
          eventContent.body !== undefined &&
          typeof eventContent.body === "string" &&
          validateReplyMessage(eventContent.body)
        ) {
          const replyData = parseReplyMessageFromBody(eventContent.body)

          return {
            kind: MessageKind.Reply,
            messageId: messageBaseProperties.messageId,
            data: {
              ...messageBaseProperties,
              text: replyData.message,
              quotedMessageId: reply.event_id,
              quotedText: replyData.quotedMessage,
              quotedUserDisplayName: replyData.quotedUser,
            },
          }
        }
      }

      return {
        kind: MessageKind.Text,
        messageId: messageBaseProperties.messageId,
        data: {
          ...messageBaseProperties,
          text: eventContent.body,
        },
      }
    }

    case MsgType.Image: {
      if (typeof eventContent.url !== "string") {
        console.warn("Image url should be valid,", eventContent.url)

        return null
      }

      return {
        kind: MessageKind.Image,
        messageId: messageBaseProperties.messageId,
        data: {
          ...messageBaseProperties,
          imageUrl: getImageUrl(eventContent.url, room.client),
        },
      }
    }

    case MsgType.File: {
      const fileUrl = eventContent.url

      if (typeof fileUrl !== "string") {
        console.warn("File url should be valid,", eventContent.url)

        return null
      }

      return {
        kind: MessageKind.File,
        messageId: messageBaseProperties.messageId,
        data: {
          ...messageBaseProperties,
          fileUrl: getFileUrl(fileUrl, room.client),
          fileName: eventContent.body,
          fileSize: eventContent.info.size,
        },
      }
    }

    case MsgType.Audio: {
      const audioUrl = eventContent.url

      if (typeof audioUrl !== "string") {
        return null
      }

      return {
        kind: MessageKind.Audio,
        messageId: messageBaseProperties.messageId,
        data: {
          ...messageBaseProperties,
          audioUrl: getFileUrl(audioUrl, room.client),
        },
      }
    }

    case MsgType.Video: {
      if (typeof eventContent.url !== "string") {
        return null
      }

      const videoUrl = getFileUrl(eventContent.url, room.client)

      if (videoUrl === undefined) {
        return null
      }

      const poster =
        typeof eventContent.info.thumbnail_url === "string"
          ? getImageUrl(eventContent.info.thumbnail_url, room.client)
          : eventContent.info.thumbnail_url

      return {
        kind: MessageKind.Video,
        messageId: messageBaseProperties.messageId,
        data: {
          ...messageBaseProperties,
          url: videoUrl,
          thumbnail: poster,
        },
      }
    }

    case undefined: {
      const unsigned = event.getUnsigned()

      if (unsigned.redacted_because?.type !== EventType.RoomRedaction) {
        return null
      }

      return convertToMessageDeleted(room, event)
    }

    default: {
      return null
    }
  }
}

const convertToMessageDeleted = (
  room: Room,
  event: MatrixEvent
): AnyMessage | null => {
  const eventId = event.event.event_id
  const deletedBy = event.getUnsigned().redacted_because?.sender
  const sender = event.sender

  if (eventId === undefined || deletedBy === undefined || sender === null) {
    return null
  }

  const member = room.getMember(deletedBy)
  const deletedByUser = member?.name ?? deletedBy
  const reason = event.getUnsigned().redacted_because?.content.reason

  const text =
    reason === undefined || typeof reason !== "string" || reason.length === 0
      ? t(LangKey.DeletedMessage, deletedByUser)
      : t(LangKey.DeletedMessageBecause, deletedByUser, reason)

  return {
    kind: MessageKind.Text,
    messageId: eventId,
    data: {
      userId: sender.userId,
      authorAvatarUrl: getImageUrl(sender.getMxcAvatarUrl(), room.client),
      authorDisplayName: sender.name,
      authorDisplayNameColor: stringToColor(sender.userId),
      text,
      timestamp: event.localTimestamp,
      messageId: eventId,
      isDeleted: true,
    },
  }
}
