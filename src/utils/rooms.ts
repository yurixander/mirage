import {
  type Room,
  type MatrixClient,
  Direction,
  EventType,
  HistoryVisibility,
  JoinRule,
  type MatrixEvent,
  MsgType,
  type User,
} from "matrix-js-sdk"
import {
  assert,
  deleteMessage,
  getImageUrl,
  normalizeName,
  stringToColor,
} from "./util"
import {type RosterUserProps} from "@/containers/Roster/RosterUser"
import {
  getRoomAdminsAndModerators,
  getUserLastPresence,
  isUserRoomAdminOrMod,
  UserPowerLevel,
} from "./members"
import {type AnyMessage, MessageKind} from "@/hooks/matrix/useActiveRoom"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {type MessageBaseProps} from "@/components/MessageContainer"
import {buildMessageMenuItems} from "./menu"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {RoomType} from "@/components/Room"

export enum ImageSizes {
  Server = 47,
  MessageAndProfile = 40,
  ProfileLarge = 60,
}

export async function getAllJoinedRooms(
  client: MatrixClient
): Promise<PartialRoom[]> {
  const currentJoinedRooms: PartialRoom[] = []

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
        type: isDirectRoom(joinedRoom) ? RoomType.Direct : RoomType.Group,
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
  const directRooms = client.getAccountData("m.direct")
  const content = directRooms?.event.content

  if (content === undefined) {
    return []
  }

  return Object.values(content).flat()
}

export function isDirectRoom(room: Room): boolean {
  return (
    room
      .getLiveTimeline()
      .getState(Direction.Forward)
      ?.events.get(EventType.RoomMember)
      // Find event by userId.
      // If the client user is not in the room event then this room is not a direct chat for the user.
      ?.get(room.myUserId)?.event.content?.is_direct ?? false
  )
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
  client: MatrixClient,
  activeRoom: Room
): Promise<AnyMessage[]> => {
  const roomHistory = await client.scrollback(activeRoom, 30)
  const events = roomHistory.getLiveTimeline().getEvents()
  const lastReadEventId = getLastReadEventIdFromRoom(activeRoom, client)
  const isAdminOrModerator = isUserRoomAdminOrMod(activeRoom)
  const allMessageProperties: AnyMessage[] = []

  for (let index = 0; index < events.length; index++) {
    const event = events[index]

    const messageProperties = await handleEvents(
      client,
      event,
      roomHistory.roomId,
      isAdminOrModerator
    )

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

export const handleEvents = async (
  client: MatrixClient,
  event: MatrixEvent,
  roomId: string,
  isAdminOrModerator: boolean
): Promise<AnyMessage | null> => {
  const timestamp = event.localTimestamp
  const sender = event.sender?.userId ?? null

  if (sender === null) {
    return null
  }

  const user = client.getUser(sender)?.displayName

  if (user === undefined) {
    return null
  }

  switch (event.getType()) {
    case EventType.RoomMessage: {
      return await handleMessagesEvent(
        client,
        timestamp,
        event,
        roomId,
        sender,
        isAdminOrModerator
      )
    }
    case EventType.RoomMember: {
      return handleMemberEvent(user, timestamp, client, event)
    }
    case EventType.RoomTopic: {
      return await handleRoomTopicEvent(user, timestamp, event)
    }
    case EventType.RoomGuestAccess: {
      return await handleGuestAccessEvent(user, timestamp, event)
    }
    case EventType.RoomHistoryVisibility: {
      return await handleHistoryVisibilityEvent(user, timestamp, event)
    }
    case EventType.RoomJoinRules: {
      return await handleJoinRulesEvent(user, timestamp, event)
    }
    case EventType.RoomCanonicalAlias: {
      return await handleRoomCanonicalAliasEvent(user, timestamp, event)
    }
    case EventType.RoomAvatar: {
      return await handleRoomAvatarEvent(user, timestamp, event)
    }
    case EventType.RoomName: {
      return await handleRoomNameEvent(user, timestamp, event)
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

export function handleMemberLeave(
  user: string,
  displayName?: string,
  previousDisplayName?: string,
  previousMembership?: string
): string | null {
  if (
    displayName === undefined ||
    previousDisplayName === undefined ||
    previousMembership === undefined
  ) {
    return null
  }

  switch (previousMembership) {
    case KnownMembership.Invite: {
      return `${user} has canceled the invitation to ${previousDisplayName}`
    }
    case KnownMembership.Ban: {
      return `${user} has removed the ban from ${displayName}`
    }
    case KnownMembership.Join: {
      return `${user} has left the room`
    }
    default: {
      return null
    }
  }
}

export const handleMemberEvent = (
  user: string,
  timestamp: number,
  client: MatrixClient,
  event: MatrixEvent
): AnyMessage | null => {
  const previousContent = event.getUnsigned().prev_content
  const eventContent = event.getContent()
  const stateKey = event.getStateKey()
  const eventId = event.event.event_id
  const displayName = eventContent.displayname
  const previousMembership = previousContent?.membership
  const previousDisplayName = previousContent?.displayname
  let text: string | null = null

  if (stateKey === undefined || eventId === undefined) {
    return null
  }

  switch (eventContent.membership) {
    // TODO: Handle here other types of RoomMember events.
    case KnownMembership.Join: {
      if (
        previousMembership === KnownMembership.Invite ||
        previousMembership !== KnownMembership.Join
      ) {
        text = `${user} has joined to the room`
      } else if (
        previousDisplayName !== undefined &&
        displayName !== previousDisplayName
      ) {
        text = `${previousDisplayName} has change the name to ${displayName}`
      } else if (
        eventContent.avatar_url !== undefined &&
        previousContent?.avatar_url === undefined
      ) {
        text = `${displayName} has put a profile photo`
      } else if (
        eventContent.avatar_url !== undefined &&
        eventContent.avatar_url !== previousContent?.avatar_url
      ) {
        text = `${displayName} has change to the profile photo`
      } else if (
        eventContent.avatar_url === undefined &&
        previousContent?.avatar_url !== undefined
      ) {
        text = `${displayName} has remove the profile photo`
      }

      break
    }
    case KnownMembership.Invite: {
      text = `${user} invited ${displayName}`

      break
    }
    case KnownMembership.Ban: {
      text = `${user} has banned ${previousDisplayName}: ${eventContent.reason}`

      break
    }
    case KnownMembership.Leave: {
      text = handleMemberLeave(
        user,
        client.getUser(stateKey)?.displayName,
        previousDisplayName,
        previousMembership
      )

      break
    }
    case undefined: {
      return null
    }
  }

  if (text === null) {
    // If event is not handled or the event has error.
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {text, timestamp, id: eventId},
  }
}

export const handleGuestAccessEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let text: string | null = null
  const guestAccess = event.getContent().guest_access

  switch (guestAccess) {
    case "can_join": {
      text = `${user} authorized anyone to join the room`

      break
    }
    case "forbidden": {
      text = `${user} has prohibited guests from joining the room`

      break
    }
    case "restricted": {
      text = `${user} restricted guest access to the room. Only guests with valid tokens can join.`

      break
    }
    case "knock": {
      text = `${user} enabled "knocking" for guests. Guests must request access to join.`

      break
    }
    default: {
      console.warn("Unknown guest access type:", guestAccess)
    }
  }

  const eventId = event.event.event_id

  if (text === null || eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleJoinRulesEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let text: string | null = null

  switch (event.getContent().join_rule) {
    case JoinRule.Invite: {
      text = `${user} restricted the room to guests`

      break
    }
    case JoinRule.Public: {
      text = `${user} made the room public to anyone who knows the link.`

      break
    }
    case JoinRule.Restricted: {
      text = `${user} made the room private. Only admins can invite now.`

      break
    }
    default: {
      console.warn("Unknown join rule:", event.getContent().join_rule)
    }
  }

  const eventId = event.event.event_id

  if (text === null || eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleRoomTopicEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  const topic = event.getContent().topic
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  const text =
    topic === undefined
      ? `${user} has remove the topic of the room`
      : `${user} has change to the topic to <<${topic}>>`

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleHistoryVisibilityEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let content: string | null = null

  switch (event.getContent().history_visibility) {
    case HistoryVisibility.Shared: {
      content = `${user} made the future history of the room visible to all members of the room`

      break
    }
    case HistoryVisibility.Invited: {
      content = `${user} made the room future history visible to all room members, from the moment they are invited.`

      break
    }
    case HistoryVisibility.Joined: {
      content = `${user} made the room future history visible to all room members, from the moment they are joined.`

      break
    }
    case HistoryVisibility.WorldReadable: {
      content = `${user} made the future history of the room visible to anyone people.`

      break
    }
  }

  const eventId = event.event.event_id

  if (content === null || eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
      id: eventId,
    },
  }
}

export const handleRoomCanonicalAliasEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  const alias = event.getContent().alias

  const text =
    alias === undefined
      ? `${user} has remove the main address for this room`
      : `${user} set the main address for this room as ${alias}`

  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleRoomAvatarEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  const text =
    event.getContent().url === undefined
      ? `${user} has remove the avatar for this room`
      : `${user} changed the avatar of the room`

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleRoomNameEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  const text = `${user} has changed the room name to ${event.getContent().name}`
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text,
      timestamp,
      id: eventId,
    },
  }
}

export const handleMessagesEvent = async (
  client: MatrixClient,
  timestamp: number,
  event: MatrixEvent,
  roomId: string,
  sender: string,
  isAdminOrModerator: boolean
): Promise<AnyMessage | null> => {
  const eventContent = event.getContent()
  const user = client.getUser(sender)
  const isMessageOfMyUser = client.getUserId() === sender

  if (user === null) {
    return null
  }

  const eventId = event.event.event_id
  const authorDisplayName = user.displayName ?? user.userId

  if (eventId === undefined) {
    return null
  }

  const messageBaseProperties: MessageBaseProps = {
    authorAvatarUrl: getImageUrl(
      user.avatarUrl,
      client,
      ImageSizes.MessageAndProfile
    ),
    authorDisplayName,
    authorDisplayNameColor: stringToColor(authorDisplayName),
    id: eventId,
    onAuthorClick: () => {
      // TODO: Handle onAuthorClick here.
    },
    text: eventContent.body,
    timestamp,
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
              deleteMessage(client, roomId, eventId)
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
              deleteMessage(client, roomId, eventId)
            },
          }),
        },
      }
    }
    case undefined: {
      return convertToMessageDeletedProperties(client, user, timestamp, event)
    }
    default: {
      return null
    }
  }
}

const convertToMessageDeletedProperties = (
  client: MatrixClient,
  user: User,
  timestamp: number,
  event: MatrixEvent
): AnyMessage | null => {
  const eventId = event.event.event_id
  const deletedBy = event.getUnsigned().redacted_because?.sender
  const authorDisplayName = user.displayName ?? user.userId

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

  return {
    kind: MessageKind.Text,
    data: {
      authorAvatarUrl: getImageUrl(user.avatarUrl, client),
      authorDisplayName,
      authorDisplayNameColor: stringToColor(authorDisplayName),
      onAuthorClick: () => {},
      text,
      timestamp,
      id: eventId,
      contextMenuItems: buildMessageMenuItems({
        canDeleteMessage: false,
        isMessageError: true,
      }),
    },
  }
}
