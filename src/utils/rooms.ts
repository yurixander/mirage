import {
  type Room,
  type MatrixClient,
  EventType,
  HistoryVisibility,
  JoinRule,
  type MatrixEvent,
  MsgType,
  type RoomMember,
  type IContent,
} from "matrix-js-sdk"
import {
  assert,
  deleteMessage,
  emojiRandom,
  getImageUrl,
  normalizeName,
  stringToColor,
} from "./util"
import {type RosterUserProps} from "@/containers/Roster/RosterUser"
import {
  getRoomAdminsAndModerators,
  getUserLastPresence,
  isCurrentUserAdminOrMod,
  UserPowerLevel,
} from "./members"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {type MessageBaseProps} from "@/components/MessageContainer"
import {buildMessageMenuItems} from "./menu"
import {
  type AnyMessage,
  MessageKind,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {RoomType} from "@/components/Room"
import {type EventMessagePropsCommon} from "@/components/EventMessage"

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

      if (joinedRoom === null) {
        continue
      }

      currentJoinedRooms.push({
        roomId: joinedRoom.roomId,
        roomName: joinedRoom.name,
        type: directRoomIds.includes(joinedRoomId)
          ? RoomType.Direct
          : RoomType.Group,
        emoji: emojiRandom(),
      })
    }
  } catch (error) {
    console.error("An error ocurred while getting all joined rooms", error)
  }

  return currentJoinedRooms
}

export async function getRoomMembers(room: Room): Promise<RosterUserProps[]> {
  const members = await room.client.getJoinedRoomMembers(room.roomId)
  const adminsOrModerators = await getRoomAdminsAndModerators(room)
  const joinedMembers = members.joined
  const membersProperty: RosterUserProps[] = adminsOrModerators

  let memberCount = 0

  for (const userId in joinedMembers) {
    if (memberCount >= 30) {
      break
    }

    const member = joinedMembers[userId]

    const isAdminOrModerator = adminsOrModerators.some(
      adminOrModerator => adminOrModerator.userId === userId
    )

    if (member === undefined || isAdminOrModerator) {
      continue
    }

    const lastPresenceAge =
      (await getUserLastPresence(room, userId)) ?? undefined

    // TODO: Use actual props instead of dummy data.
    membersProperty.push({
      displayName: normalizeName(member.display_name ?? userId),
      lastPresenceAge,
      avatarUrl: getImageUrl(
        member.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
      powerLevel: UserPowerLevel.Member,
      onClick: () => {},
      userId,
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

// #region Events

export const handleRoomEvents = async (
  activeRoom: Room
): Promise<AnyMessage[]> => {
  const client = activeRoom.client
  const roomHistory = await client.scrollback(activeRoom, 30)
  const events = roomHistory.getLiveTimeline().getEvents()
  const lastReadEventId = getLastReadEventIdFromRoom(activeRoom, client)
  const allMessageProperties: AnyMessage[] = []

  for (let index = 0; index < events.length; index++) {
    const event = events[index]

    const messageProperties = await handleEvent(client, event, roomHistory)

    if (messageProperties === null) {
      continue
    }

    allMessageProperties.push(messageProperties)

    if (lastReadEventId === event.getId() && index !== events.length - 1) {
      allMessageProperties.push({
        kind: MessageKind.Unread,
        data: {lastReadEventId},
      })
    }

    void client.sendReadReceipt(event)
  }

  return allMessageProperties
}

export const handleEvent = async (
  client: MatrixClient,
  event: MatrixEvent,
  room: Room
): Promise<AnyMessage | null> => {
  if (event.getType() === EventType.RoomMessage) {
    return await handleMessagesEvent(client, event, room)
  }

  const eventMessageBody = await handleEventMessage(event)

  // TODO: Handle errors instead of throwing null.
  if (
    event.sender === null ||
    event.event.event_id === undefined ||
    eventMessageBody === null
  ) {
    return null
  }

  const commonProps: EventMessagePropsCommon = {
    eventId: event.event.event_id,
    sender: {
      displayName: event.sender.name,
      userId: event.sender.userId,
    },
    timestamp: event.localTimestamp,
  }

  return {
    kind: MessageKind.Event,
    data: {
      ...commonProps,
      body: eventMessageBody,
    },
  }
}

export async function handleEventMessage(
  event: MatrixEvent
): Promise<string | null> {
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

export function getLastReadEventIdFromRoom(
  room: Room,
  client: MatrixClient
): string | null {
  const userId = client.getUserId()

  if (userId === null) {
    return null
  }

  const eventReadUpTo = room.getEventReadUpTo(userId)

  if (eventReadUpTo === null) {
    return null
  }

  return room.findEventById(eventReadUpTo)?.getId() ?? null
}

export const handleMemberEvent = (
  stateKey: string | undefined,
  eventContent: IContent,
  previousContent: IContent
): string | null => {
  const displayName = eventContent.displayname
  const previousMembership = previousContent.membership
  const previousDisplayName = previousContent.displayname

  switch (eventContent.membership) {
    case KnownMembership.Join: {
      if (
        previousMembership === KnownMembership.Invite ||
        previousMembership !== KnownMembership.Join
      ) {
        return "has joined to the room"
      } else if (
        previousDisplayName !== undefined &&
        displayName !== previousDisplayName
      ) {
        return `has change the name to ${displayName}`
      } else if (
        eventContent.avatar_url !== undefined &&
        previousContent?.avatar_url === undefined
      ) {
        return "has put a profile photo"
      } else if (
        eventContent.avatar_url !== undefined &&
        eventContent.avatar_url !== previousContent?.avatar_url
      ) {
        return "has change to the profile photo"
      } else if (
        eventContent.avatar_url === undefined &&
        previousContent?.avatar_url !== undefined
      ) {
        return "has remove the profile photo"
      }

      break
    }
    case KnownMembership.Invite: {
      return `invited ${displayName}`
    }
    case KnownMembership.Ban: {
      return `has banned ${previousDisplayName}: ${eventContent.reason}`
    }
    case KnownMembership.Leave: {
      return handleMemberLeave(stateKey, eventContent, previousMembership)
    }
    default: {
      console.warn("Unknown membership type:", eventContent.membership)
    }
  }

  return null
}

export function handleMemberLeave(
  stateKey: string | undefined,
  eventContent: IContent,
  previousMembership?: string
): string | null {
  switch (previousMembership) {
    case KnownMembership.Invite: {
      const userForCanceled = eventContent.displayname ?? stateKey

      // TODO: Show error when not have userForCanceled.
      if (userForCanceled === undefined) {
        return null
      }

      return `has canceled the invitation to ${userForCanceled}`
    }
    case KnownMembership.Ban: {
      // TODO: Show error when state key is undefined.
      if (stateKey === undefined) {
        return null
      }

      return `has removed the ban from ${stateKey}`
    }
    case KnownMembership.Join: {
      return `has left the room`
    }
    default: {
      return null
    }
  }
}

export const handleGuestAccessEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  switch (eventContent.guest_access) {
    case "can_join": {
      return "authorized anyone to join the room"
    }
    case "forbidden": {
      return "has prohibited guests from joining the room"
    }
    case "restricted": {
      return "restricted guest access to the room. Only guests with valid tokens can join."
    }
    case "knock": {
      return "enabled `knocking` for guests. Guests must request access to join."
    }
    default: {
      console.warn("Unknown guest access type:", eventContent.guest_access)
    }
  }

  return null
}

export const handleJoinRulesEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  switch (eventContent.join_rule) {
    case JoinRule.Invite: {
      return "restricted the room to guests"
    }
    case JoinRule.Public: {
      return "made the room public to anyone who knows the link"
    }
    case JoinRule.Restricted: {
      return "made the room private. Only admins can invite now"
    }
    default: {
      console.warn("Unknown join rule:", eventContent.join_rule)
    }
  }

  return null
}

export const handleRoomTopicEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  const topic = eventContent.topic

  return topic === undefined
    ? `has remove the topic of the room`
    : `has change to the topic to <<${topic}>>`
}

export const handleHistoryVisibilityEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  switch (eventContent.history_visibility) {
    case HistoryVisibility.Shared: {
      return "made the future history of the room visible to all members of the room."
    }
    case HistoryVisibility.Invited: {
      return "made the room future history visible to all room members, from the moment they are invited."
    }
    case HistoryVisibility.Joined: {
      return "made the room future history visible to all room members, from the moment they are joined."
    }
    case HistoryVisibility.WorldReadable: {
      return "made the future history of the room visible to anyone people."
    }
  }

  return null
}

export const handleRoomCanonicalAliasEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  return eventContent.alias === undefined
    ? "has remove the main address for this room"
    : `set the main address for this room as ${eventContent.alias}`
}

export const handleRoomAvatarEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  return eventContent.url === undefined
    ? "has remove the avatar for this room"
    : "changed the avatar of the room"
}

export const handleRoomNameEvent = async (
  eventContent: IContent
): Promise<string | null> => {
  return eventContent.name === undefined
    ? "has changed the room name"
    : `has changed the room name to ${eventContent.name}`
}

export const handleMessagesEvent = async (
  client: MatrixClient,
  event: MatrixEvent,
  room: Room
): Promise<AnyMessage | null> => {
  const sender = event.sender
  const eventContent = event.getContent()
  const isAdminOrModerator = isCurrentUserAdminOrMod(room)
  const isMessageOfMyUser = client.getUserId() === sender?.userId
  const eventId = event.event.event_id

  if (sender === null || eventId === undefined) {
    return null
  }

  const messageBaseProperties: MessageBaseProps = {
    authorAvatarUrl: getImageUrl(
      sender.getMxcAvatarUrl(),
      client,
      ImageSizes.MessageAndProfile
    ),
    authorDisplayName: sender.name,
    authorDisplayNameColor: stringToColor(sender.name),
    id: eventId,
    onAuthorClick: () => {
      // TODO: Handle onAuthorClick here.
    },
    text: eventContent.body,
    timestamp: event.localTimestamp,
    // TODO: Handle context menu for images.
    contextMenuItems: [],
  }

  switch (eventContent.msgtype) {
    case MsgType.Text: {
      return {
        kind: MessageKind.Text,
        data: {
          ...messageBaseProperties,
          contextMenuItems: buildMessageMenuItems({
            canDeleteMessage: isAdminOrModerator || isMessageOfMyUser,
            isMessageError: false,
            onReplyMessage() {
              // TODO: Handle reply
            },
            onResendMessage() {
              // TODO: Handle resend message here.
            },
            onDeleteMessage() {
              deleteMessage(client, room.roomId, eventId)
            },
          }),
        },
      }
    }
    case MsgType.Image: {
      return {
        kind: MessageKind.Image,
        data: {
          ...messageBaseProperties,
          text: "",
          // TODO: Change use `as` for cast and null handling.
          imageUrl: getImageUrl(eventContent.url as string, client),
          contextMenuItems: buildMessageMenuItems({
            canDeleteMessage: isAdminOrModerator || isMessageOfMyUser,
            isMessageError: false,
            isSaveable: true,
            onReplyMessage() {
              // TODO: Handle reply
            },
            onResendMessage() {
              // TODO: Handle resend message here.
            },
            onSaveContent() {
              // TODO: Handle image saving here.
            },
            onDeleteMessage() {
              deleteMessage(client, room.roomId, eventId)
            },
          }),
          onClickImage() {},
        },
      }
    }
    case undefined: {
      // TODO: Return convertToMessageDeletedProperties(client, sender, event)
      return null
    }
    default: {
      return null
    }
  }
}

const convertToMessageDeletedProperties = (
  client: MatrixClient,
  user: RoomMember,
  event: MatrixEvent
): AnyMessage | null => {
  const eventId = event.event.event_id
  const deletedBy = event.getUnsigned().redacted_because?.sender

  if (eventId === undefined || deletedBy === undefined) {
    return null
  }

  const deletedByUser = client.getUser(deletedBy)?.displayName

  if (deletedByUser === undefined) {
    return null
  }

  const reason = event.getUnsigned().redacted_because?.content.reason

  const text =
    reason === undefined
      ? `${deletedByUser} has delete this message`
      : `${deletedByUser} has delete this message because <<${reason}>>`

  // TODO: Delete this return
  return null

  // return {
  //   kind: MessageKind.Text,
  //   data: {
  //     authorAvatarUrl: getImageUrl(user.avatarUrl, client),
  //     authorDisplayName,
  //     authorDisplayNameColor: stringToColor(authorDisplayName),
  //     onAuthorClick: () => {},
  //     text,
  //     timestamp,
  //     id: eventId,
  //     contextMenuItems: buildMessageMenuItems({
  //       canDeleteMessage: false,
  //       isMessageError: true,
  //     }),
  //   },
  // }
}
