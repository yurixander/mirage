import {type EventMessageProps} from "@/components/EventMessage"
import {type ImageMessageProps} from "@/components/ImageMessage"
import {type TextMessageProps} from "@/components/TextMessage"
import useConnection from "@/hooks/matrix/useConnection"
import {
  EventType,
  MsgType,
  type Room,
  type MatrixClient,
  type User,
  RoomMemberEvent,
  RoomEvent,
  type MatrixEvent,
} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import {create} from "zustand"
import useEventListener from "./useEventListener"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {deleteMessage, getImageUrl, getRoomMembers} from "@/utils/util"
import {type RosterUserProps} from "@/components/RosterUser"

type ActiveRoomIdStore = {
  activeRoomId: string | null
  setActiveRoomId: (roomId: string) => void
}

const useActiveRoomIdStore = create<ActiveRoomIdStore>(set => ({
  activeRoomId: null,
  setActiveRoomId: roomId => {
    set(_state => ({activeRoomId: roomId}))
  },
}))

export enum MessageKind {
  Text,
  Image,
  Event,
}

type MessageOf<Kind extends MessageKind> = Kind extends MessageKind.Text
  ? TextMessageProps
  : Kind extends MessageKind.Image
    ? ImageMessageProps
    : EventMessageProps

type Message<Kind extends MessageKind> = {
  kind: Kind
  data: MessageOf<Kind>
}

// TODO: Make the compiler recognize when it is one and when it is another.
type AnyMessage = Message<MessageKind>

const useActiveRoom = () => {
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const {client} = useConnection()
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const [members, setMembers] = useState<RosterUserProps[]>([])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      throw new Error(`Room with ID ${activeRoomId} does not exist`)
    }

    setActiveRoom(room)
  }, [client, activeRoomId])

  useEffect(() => {
    if (activeRoom === null || client === null) {
      return
    }

    setMembers(getRoomMembers(client, activeRoom))

    void handleRoomEvents(client, activeRoom).then(messagesAndEvents => {
      setMessages(messagesAndEvents)
    })
  }, [activeRoom, client])

  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== activeRoomId || client === null) {
      return
    }

    void handleEvents(client, event, activeRoomId).then(messageOrEvent => {
      if (messageOrEvent === null) {
        return
      }

      setMessages(messages => [...messages, messageOrEvent])
      void client.sendReadReceipt(event)
    })
  })

  useEventListener(RoomEvent.Redaction, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== activeRoomId || client === null) {
      return
    }

    const eventContent = event.getContent()

    if (eventContent.msgtype !== undefined || activeRoom === null) {
      return
    }

    void handleRoomEvents(client, activeRoom).then(messagesOrEvents => {
      if (messagesOrEvents === null) {
        return
      }

      setMessages(messagesOrEvents)
      void client.sendReadReceipt(event)
    })
  })

  // When users begin typing, add them to the list of typing users.
  useEventListener(RoomMemberEvent.Typing, (_event, member) => {
    const userId = client?.getUserId()

    if (member.userId === userId || member.roomId !== activeRoomId) {
      return
    }

    if (member.typing) {
      setTypingUsers(typingUsers => [
        ...typingUsers,
        {
          displayName: member.name,
          color: "#5CC679",
          avatarUrl: getImageUrl(member.getMxcAvatarUrl() ?? null, client),
        },
      ])
    } else {
      setTypingUsers(typingUsers =>
        typingUsers.filter(user => user.displayName !== member.name)
      )
    }
  })

  const sendTextMessage = useCallback(
    async (type: MsgType, body: string) => {
      if (activeRoomId === null || client === null) {
        return
      }

      await client.sendMessage(activeRoomId, {body, msgtype: type})
    },
    [activeRoomId, client]
  )

  const sendEventTyping = useCallback(async () => {
    if (activeRoomId === null || client === null) {
      return
    }

    await client.sendTyping(activeRoomId, true, 2000)
  }, [activeRoomId, client])

  return {
    activeRoomId,
    activeRoom,
    setActiveRoomId,
    messages,
    sendTextMessage,
    typingUsers,
    sendEventTyping,
    client,
    members,
    deleteMessage,
  }
}

const handleRoomEvents = async (
  client: MatrixClient,
  activeRoom: Room
): Promise<AnyMessage[]> => {
  const roomHistory = await client.scrollback(activeRoom, 30)
  const events = roomHistory.getLiveTimeline().getEvents()
  const allMessageProps: AnyMessage[] = []

  for (const event of events) {
    const messageProps = await handleEvents(client, event, roomHistory.roomId)

    if (messageProps === null) {
      continue
    }

    allMessageProps.push(messageProps)
    void client.sendReadReceipt(event)
  }

  return allMessageProps
}

const handleEvents = async (
  client: MatrixClient,
  event: MatrixEvent,
  roomId: string
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
    case EventType.RoomMessage:
      return await handleMessagesEvent(client, timestamp, event, roomId, sender)
    case EventType.RoomMember:
      return handleMemberEvent(user, timestamp, client, event)
    case EventType.RoomTopic:
      return await handleRoomTopicEvent(user, timestamp, event)
    case EventType.RoomGuestAccess:
      return await handleGuestAccessEvent(user, timestamp, event)
    case EventType.RoomHistoryVisibility:
      return await handleHistoryVisibilityEvent(user, timestamp, event)
    case EventType.RoomJoinRules:
      return await handleJoinRulesEvent(user, timestamp, event)
    case EventType.RoomCanonicalAlias:
      return await handleRoomCanonicalAliasEvent(user, timestamp, event)
    case EventType.RoomAvatar:
      return await handleRoomAvatarEvent(user, timestamp, event)
    case EventType.RoomName:
      return await handleRoomNameEvent(user, timestamp, event)
    default:
      return null
  }
}

const handleRoomNameEvent = async (
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

const handleMessagesEvent = async (
  client: MatrixClient,
  timestamp: number,
  event: MatrixEvent,
  roomId: string,
  sender: string
): Promise<AnyMessage | null> => {
  const eventContent = event.getContent()
  const user = client.getUser(sender)

  if (user === null) {
    return null
  }

  switch (eventContent.msgtype) {
    case MsgType.Text: {
      return convertEventToTextMessageProps(
        client,
        user,
        timestamp,
        event,
        roomId
      )
    }
    case MsgType.Image: {
      return convertEventToImageMessageProps(
        client,
        user,
        timestamp,
        event,
        roomId
      )
    }
    case undefined:
      return convertToMessageDeletedProps(client, user, timestamp, event)
    default:
      return null
  }
}

const convertEventToImageMessageProps = (
  client: MatrixClient,
  user: User,
  timestamp: number,
  event: MatrixEvent,
  roomId: string
): AnyMessage | null => {
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Image,
    data: {
      authorAvatarUrl: getImageUrl(user.avatarUrl ?? null, client),
      authorDisplayName: user.displayName ?? user.userId,
      authorDisplayNameColor: "",
      id: eventId,
      onAuthorClick: () => {},
      text: "",
      timestamp,
      // TODO: Handle here when the image url is undefined.
      imageUrl: getImageUrl(event.getContent().url as string, client) ?? "",
      onDeleteMessage: () => {
        deleteMessage(client, roomId, eventId)
      },
    },
  }
}

const convertEventToTextMessageProps = (
  client: MatrixClient,
  user: User,
  timestamp: number,
  event: MatrixEvent,
  roomId: string
): AnyMessage | null => {
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Text,
    data: {
      authorAvatarUrl: getImageUrl(user.avatarUrl ?? null, client),
      authorDisplayName: user.displayName ?? user.userId,
      authorDisplayNameColor: "",
      id: eventId,
      onAuthorClick: () => {},
      text: event.getContent().body,
      timestamp,
      onDeleteMessage: () => {
        deleteMessage(client, roomId, eventId)
      },
    },
  }
}

const convertToMessageDeletedProps = (
  client: MatrixClient,
  user: User,
  timestamp: number,
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
    reason !== undefined
      ? `${deletedByUser} has delete this message because <<${reason}>>`
      : `${deletedByUser} has delete this message`

  return {
    kind: MessageKind.Text,
    data: {
      authorAvatarUrl: getImageUrl(user.avatarUrl ?? null, client),
      authorDisplayName: user.displayName ?? user.userId,
      authorDisplayNameColor: "",
      id: eventId,
      onAuthorClick: () => {},
      text,
      timestamp,
    },
  }
}

const handleMemberEvent = (
  user: string,
  timestamp: number,
  client: MatrixClient,
  event: MatrixEvent
): AnyMessage | null => {
  let text: string | null = null

  const prevContent = event.getUnsigned().prev_content
  const eventContent = event.getContent()
  const stateKey = event.getStateKey()
  const eventId = event.event.event_id
  const displayName = eventContent.displayname
  const prevMembership = prevContent?.membership
  const prevDisplayName = prevContent?.displayname

  if (stateKey === undefined || eventId === undefined) {
    return null
  }

  switch (eventContent.membership) {
    // TODO: Handle here other types of RoomMember events
    case "join": {
      if (prevMembership === "invite" || prevMembership !== "join") {
        text = `${displayName} has joined to the room`
      } else if (
        prevDisplayName !== undefined &&
        displayName !== prevDisplayName
      ) {
        text = `${prevDisplayName} has change the name to ${displayName}`
      } else if (
        eventContent.avatar_url !== undefined &&
        prevContent?.avatar_url === undefined
      ) {
        text = `${displayName} has put a profile photo`
      } else if (
        eventContent.avatar_url !== undefined &&
        eventContent.avatar_url !== prevContent?.avatar_url
      ) {
        text = `${displayName} has change to the profile photo`
      } else if (
        eventContent.avatar_url === undefined &&
        prevContent?.avatar_url !== undefined
      ) {
        text = `${displayName} has remove the profile photo`
      }

      break
    }
    case "invite":
      text = `${user} invited ${displayName}`
      break
    case "ban": {
      text = `${user} has banned ${prevDisplayName}: ${eventContent.reason}`
      break
    }
    case "leave": {
      switch (prevMembership) {
        case "invite":
          text = `${user} has canceled the invitation to ${prevDisplayName}`
          break
        case "ban":
          text = `${user} has removed the ban from ${client.getUser(stateKey)?.displayName}`
          break
        case "join":
          text = `${user} has left the room`
          break
        default:
          break
      }
    }
  }

  if (text === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {text, timestamp, id: eventId},
  }
}

const handleGuestAccessEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let text: string | null = null

  // TODO: Handle here other types of guest_access
  switch (event.getContent().guest_access) {
    case "can_join":
      text = `${user} authorized anyone to join the room`
      break
    case "forbidden":
      text = `${user} has prohibited guests from joining the room`
      break
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

const handleJoinRulesEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let text: string | null = null

  // TODO: Handle here other types of join_rule
  switch (event.getContent().join_rule) {
    case "invite":
      text = `${user} restricted the room to guests`
      break
    case "public":
      text = `${user} made the room public to anyone who knows the link.`
      break
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

const handleRoomTopicEvent = async (
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

const handleHistoryVisibilityEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let content: string | null = null

  switch (event.getContent().history_visibility) {
    case "shared":
      content = `${user} made the future history of the room visible to all members of the room`
      break
    case "invited":
      content = `${user} made the room future history visible to all room members, from the moment they are invited.`
      break
    case "joined":
      content = `${user} made the room future history visible to all room members, from the moment they are joined.`
      break
    case "world_readable":
      content = `${user} made the future history of the room visible to anyone people.`
      break
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

const handleRoomCanonicalAliasEvent = async (
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

const handleRoomAvatarEvent = async (
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

export default useActiveRoom
