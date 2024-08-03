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
  emojiRandom,
  getImageUrl,
  normalizeName,
  stringToColor,
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
        emoji: emojiRandom(),
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

    const messageProperties = await handleEvent(event, roomHistory)

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
  event: MatrixEvent,
  room: Room
): Promise<AnyMessage | null> => {
  if (event.getType() === EventType.RoomMessage) {
    return await handleMessages(event, room)
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
          body: `has change the name to ${displayName}`,
          icon: IoPeopleCircle,
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
      }

      break
    }
    case KnownMembership.Invite: {
      return {
        body: `invited ${displayName}`,
        icon: IoPeopleCircle,
      }
    }
    case KnownMembership.Ban: {
      return {
        body: `has banned ${previousDisplayName}: ${eventContent.reason}`,
        icon: IoPeopleCircle,
      }
    }
    case KnownMembership.Leave: {
      const memberLeaveBody = handleMemberLeave(
        stateKey,
        eventContent,
        previousMembership
      )

      // TODO: Handle error here instead throwing null.
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
    }
  }

  return null
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
    }
  }

  return null
}

export const handleRoomTopicEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  const topic = eventContent.topic

  return {
    icon: IoIosText,
    body:
      topic === undefined
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
  }

  return null
}

export const handleRoomCanonicalAliasEvent = async (
  eventContent: IContent
): Promise<EventMessagePartial | null> => {
  return {
    icon: IoAtCircle,
    body:
      eventContent.alias === undefined
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
      eventContent.url === undefined
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
      eventContent.name === undefined
        ? "has changed the room name"
        : `has changed the room name to ${eventContent.name}`,
  }
}

export const handleMessages = async (
  event: MatrixEvent,
  room: Room
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
    authorDisplayNameColor: stringToColor(sender.name),
    timestamp: event.localTimestamp,
    messageId: eventId,
    canDeleteMessage: isAdminOrModerator || isMessageOfMyUser,
    authorAvatarUrl: getImageUrl(
      sender.getMxcAvatarUrl(),
      room.client,
      ImageSizes.MessageAndProfile
    ),
  }

  switch (eventContent.msgtype) {
    case MsgType.Text: {
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
    reason === undefined
      ? `${deletedByUser} has delete this message`
      : `${deletedByUser} has delete this message because <<${reason}>>`

  return {
    kind: MessageKind.Text,
    data: {
      authorAvatarUrl: getImageUrl(sender.getMxcAvatarUrl(), room.client),
      authorDisplayName: sender.name,
      authorDisplayNameColor: stringToColor(sender.name),
      text,
      timestamp: event.localTimestamp,
      messageId: eventId,
      isDeleted: true,
    },
  }
}
