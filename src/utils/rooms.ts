import {
  type Room,
  type MatrixClient,
  EventType,
  HistoryVisibility,
  JoinRule,
  type MatrixEvent,
  MsgType,
  type IContent,
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
  getRoomAdminsAndModerators,
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

export enum ImageSizes {
  Server = 47,
  MessageAndProfile = 40,
  ProfileLarge = 60,
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

export async function getRoomMembers(room: Room): Promise<RosterUserData[]> {
  const members = await room.client.getJoinedRoomMembers(room.roomId)
  const adminsOrModerators = await getRoomAdminsAndModerators(room)
  const joinedMembers = members.joined
  const membersProperty: RosterUserData[] = adminsOrModerators

  let memberCount = 0

  for (const joinedMemberId in joinedMembers) {
    if (memberCount >= 30) {
      break
    }

    const member = joinedMembers[joinedMemberId]

    const isAdminOrModerator = adminsOrModerators.some(
      adminOrModerator => adminOrModerator.userId === joinedMemberId
    )

    if (member === undefined || isAdminOrModerator) {
      continue
    }

    membersProperty.push({
      displayName: normalizeName(member.display_name),
      powerLevel: UserPowerLevel.Member,
      userId: joinedMemberId,
      lastPresenceAge:
        (await getUserLastPresence(room, joinedMemberId)) ?? undefined,
      avatarUrl: getImageUrl(
        member.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
    })

    memberCount += 1
  }

  return membersProperty
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
  const lastReadEventId = activeRoom.getEventReadUpTo(activeRoom.myUserId)
  const allMessageProperties: AnyMessage[] = []

  for (const event of events) {
    const messageProperties = await handleRoomMessageEvent(event, roomHistory)

    if (messageProperties === null) {
      continue
    }

    allMessageProperties.push(messageProperties)

    if (lastReadEventId === event.event.event_id) {
      allMessageProperties.push({
        kind: MessageKind.Unread,
        data: {lastReadEventId},
      })
    }

    void client.sendReadReceipt(event)
  }

  return allMessageProperties
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
            ? `invited ${stateKey}`
            : `invited ${displayName}`,
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
            ? `has banned ${previousDisplayName}`
            : `has banned ${previousDisplayName}: ${eventContent.reason}`,
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
      body: "has joined to the room",
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
          ? "has change the name"
          : `has change the name to ${displayName}`,
    }
  } else if (
    eventContent.avatar_url !== undefined &&
    previousContent?.avatar_url === undefined
  ) {
    return {
      body: "has put a profile photo",
      icon: IoPeopleCircle,
    }
  } else if (
    eventContent.avatar_url !== undefined &&
    eventContent.avatar_url !== previousContent?.avatar_url
  ) {
    return {
      body: "has change to the profile photo",
      icon: IoPeopleCircle,
    }
  } else if (
    eventContent.avatar_url === undefined &&
    previousContent?.avatar_url !== undefined
  ) {
    return {
      body: "has remove the profile photo",
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

      return `has canceled the invitation to ${userForCanceled}`
    }
    case KnownMembership.Ban: {
      if (stateKey === undefined) {
        return null
      }

      return `has removed the ban from ${stateKey}`
    }
    case KnownMembership.Join: {
      return `has left the room`
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
        body: "authorized anyone to join the room",
        icon: IoLockClosed,
      }
    }
    case "forbidden": {
      return {
        body: "has prohibited guests from joining the room",
        icon: IoLockClosed,
      }
    }
    case "restricted": {
      return {
        body: "restricted guest access to the room. Only guests with valid tokens can join.",
        icon: IoLockClosed,
      }
    }
    case "knock": {
      return {
        body: "enabled `knocking` for guests. Guests must request access to join.",
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
        body: "restricted the room to guests",
        icon: IoIosPaper,
      }
    }
    case JoinRule.Public: {
      return {
        body: "made the room public to anyone who knows the link",
        icon: IoIosPaper,
      }
    }
    case JoinRule.Restricted: {
      return {
        body: "made the room private. Only admins can invite now",
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
        ? `has remove the topic of the room`
        : `has change to the topic to <<${topic}>>`,
  }
}

export const handleHistoryVisibilityEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  switch (eventContent.history_visibility) {
    case HistoryVisibility.Shared: {
      return {
        body: "made the future history of the room visible to all members of the room.",
        icon: IoReceipt,
      }
    }
    case HistoryVisibility.Invited: {
      return {
        body: "made the room future history visible to all room members, from the moment they are invited.",
        icon: IoReceipt,
      }
    }
    case HistoryVisibility.Joined: {
      return {
        body: "made the room future history visible to all room members, from the moment they are joined.",
        icon: IoReceipt,
      }
    }
    case HistoryVisibility.WorldReadable: {
      return {
        body: "made the future history of the room visible to anyone people.",
        icon: IoReceipt,
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
        ? "has remove the main address for this room"
        : `set the main address for this room as ${eventContent.alias}`,
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
        ? "has remove the avatar for this room"
        : "changed the avatar of the room",
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
        ? "has changed the room name"
        : `has changed the room name to ${eventContent.name}`,
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

      return {
        kind: MessageKind.Video,
        data: {
          ...messageBaseProperties,
          url: videoUrl,
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
      ? `${deletedByUser} has delete this message`
      : `${deletedByUser} has delete this message because <<${reason}>>`

  return {
    kind: MessageKind.Text,
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
