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
  type RoomMember,
  EventTimeline,
} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import {create} from "zustand"
import useEventListener from "./useEventListener"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {deleteMessage, getImageUrl} from "@/utils/util"

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
  const [adminMembers, setAdminMembers] = useState<User[]>()
  const [defaultMembers, setDefaultMembers] = useState<RoomMember[]>()

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

    const joinedMembers = activeRoom.getJoinedMembers()

    const powerLevelsEvent = activeRoom
      .getLiveTimeline()
      .getState(EventTimeline.FORWARDS)
      ?.getStateEvents("m.room.power_levels", "")

    if (powerLevelsEvent === null || powerLevelsEvent === undefined) {
      return
    }

    const powerLevels = powerLevelsEvent.getContent().users as string[]
    const users = Object.keys(powerLevels)

    const adminMembers: User[] = users
      .map((user: string) => client.getUser(user) ?? null)
      .filter((user): user is User => user !== null)

    const defaultMembers = joinedMembers.filter(
      member => !users.includes(member.userId)
    )

    setAdminMembers(adminMembers)
    setDefaultMembers(defaultMembers)

    void handleRoomEvents(client, activeRoom).then(messagesAndEvents => {
      setMessages(messagesAndEvents)
    })
  }, [activeRoom, client])

  const updateEvent = useCallback(
    async (event: MatrixEvent, client: MatrixClient, roomId: string) => {
      const newMessages: AnyMessage[] = []

      for (const message of messages) {
        if (message.data.id === event.event.event_id) {
          const newMessage = await handleEvents(client, event, roomId)

          if (newMessage === null) {
            continue
          }

          newMessages.push(newMessage)
        }

        newMessages.push(message)
      }

      setMessages(newMessages)
    },
    [messages]
  )

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

    if (eventContent.msgtype !== undefined) {
      return
    }

    void updateEvent(event, client, room.roomId)
  })

  // When users begin typing, add them to the list of typing users.
  useEventListener(RoomMemberEvent.Typing, (_event, member) => {
    const userId = client?.getUserId()

    if (member.userId === userId || member.roomId !== activeRoomId) {
      return
    }
    const displayName = member.name
    const color = "#5CC679"
    const avatarUrl = getImageUrl(member.getMxcAvatarUrl() ?? null, client)

    if (member.typing) {
      setTypingUsers(typingUsers => [
        ...typingUsers,
        {
          displayName,
          color,
          avatarUrl,
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
    adminMembers,
    defaultMembers,
    deleteMessage,
  }
}

const handleRoomEvents = async (
  client: MatrixClient,
  activeRoom: Room
): Promise<AnyMessage[]> => {
  const scrollback = await client.scrollback(activeRoom, 30)
  const events = scrollback.getLiveTimeline().getEvents()
  const allMessageProps: AnyMessage[] = []

  for (const event of events) {
    const messageProps = await handleEvents(client, event, scrollback.roomId)

    if (messageProps === null) {
      continue
    }

    allMessageProps.push(messageProps)
    // Mask as read
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
  const eventType = event.getType()

  if (sender === null) {
    return null
  }

  const user = client.getUser(sender)?.displayName

  if (user === undefined) {
    return null
  }

  switch (eventType) {
    case EventType.RoomMessage:
      return await handleMessagesEvent(client, timestamp, event, roomId)
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
  const content = `${user} has changed the room name to ${
    event.getContent().name
  }`

  const eventId = event.event.event_id

  if (eventId === undefined) {
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

const handleMessagesEvent = async (
  client: MatrixClient,
  timestamp: number,
  event: MatrixEvent,
  roomId: string
): Promise<AnyMessage | null> => {
  const eventContent = event.getContent()
  const sender = event.sender?.userId ?? null

  if (sender == null) {
    return null
  }

  const user = client.getUser(sender)

  if (user === null) {
    return null
  }

  if (eventContent.msgtype === undefined) {
    const message = messageDeletedProps(client, user, timestamp, event)

    if (message === null) {
      return null
    }

    return {
      kind: MessageKind.Text,
      data: message,
    }
  }

  switch (eventContent.msgtype) {
    case MsgType.Text: {
      const messageTextProp = convertEventToTextMessageProps(
        client,
        user,
        timestamp,
        event,
        roomId
      )

      if (messageTextProp === null) {
        return null
      }

      return {kind: MessageKind.Text, data: messageTextProp}
    }
    case MsgType.Image: {
      const messageImgProp = convertEventToImageMessageProps(
        client,
        user,
        timestamp,
        event,
        roomId
      )

      if (messageImgProp === null) {
        return null
      }

      return {kind: MessageKind.Image, data: messageImgProp}
    }
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
): ImageMessageProps | null => {
  const content = event.getContent()

  const imgUrl = client.mxcUrlToHttp(
    content.url as string,
    content.info.w as number,
    content.info.h as number,
    "scale"
  )

  const avatarUrl =
    user.avatarUrl === undefined
      ? undefined
      : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  return {
    authorAvatarUrl: avatarUrl,
    authorDisplayName: user.displayName ?? user.userId,
    authorDisplayNameColor: "",
    id: eventId,
    onAuthorClick: () => {},
    text: "",
    timestamp,
    imageUrl: imgUrl ?? "",
    onDeleteMessage: () => {
      deleteMessage(client, roomId, eventId)
    },
  }
}

const messageDeletedProps = (
  client: MatrixClient,
  user: User,
  timestamp: number,
  event: MatrixEvent
): TextMessageProps | null => {
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
  const content = `${deletedByUser} has delete this message`
  const contentByReason = `${deletedByUser} has delete this message because <<${reason}>>`

  const avatarUrl =
    user.avatarUrl === undefined
      ? undefined
      : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

  return {
    authorAvatarUrl: avatarUrl,
    authorDisplayName: user.displayName ?? user.userId,
    authorDisplayNameColor: "",
    id: eventId,
    onAuthorClick: () => {},
    text: reason !== undefined ? contentByReason : content,
    timestamp,
  }
}

const convertEventToTextMessageProps = (
  client: MatrixClient,
  user: User,
  timestamp: number,
  event: MatrixEvent,
  roomId: string
): TextMessageProps | null => {
  const eventId = event.event.event_id

  if (eventId === undefined) {
    return null
  }

  const avatarUrl =
    user.avatarUrl === undefined
      ? undefined
      : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

  return {
    authorAvatarUrl: avatarUrl,
    authorDisplayName: user.displayName ?? user.userId,
    authorDisplayNameColor: "",
    id: eventId,
    onAuthorClick: () => {},
    text: event.getContent().body,
    timestamp,
    onDeleteMessage: () => {
      deleteMessage(client, roomId, eventId)
    },
  }
}

const handleMemberEvent = (
  user: string,
  timestamp: number,
  client: MatrixClient,
  event: MatrixEvent
): AnyMessage | null => {
  const prevContent = event.getUnsigned().prev_content
  const eventContent = event.getContent()
  const stateKey = event.getStateKey()

  if (stateKey === undefined) {
    return null
  }

  const displayName = eventContent.displayname
  const prevMembership = prevContent?.membership
  const prevDisplayName = prevContent?.displayname

  let content: string | null = null

  switch (eventContent.membership) {
    // TODO: Handle here other types of RoomMember events
    case "join": {
      if (prevMembership === "invite" || prevMembership !== "join") {
        content = `${displayName} has joined to the room`
      } else if (
        prevDisplayName !== undefined &&
        displayName !== prevDisplayName
      ) {
        content = `${prevDisplayName} has change the name to ${displayName}`
      } else if (
        eventContent.avatar_url !== undefined &&
        prevContent?.avatar_url === undefined
      ) {
        content = `${displayName} has put a profile photo`
      } else if (
        eventContent.avatar_url !== undefined &&
        eventContent.avatar_url !== prevContent?.avatar_url
      ) {
        content = `${displayName} has change to the profile photo`
      } else if (
        eventContent.avatar_url === undefined &&
        prevContent?.avatar_url !== undefined
      ) {
        content = `${displayName} has remove the profile photo`
      }

      break
    }
    case "invite":
      content = `${user} invited ${displayName}`

      break
    case "ban": {
      content = `${user} has banned ${prevDisplayName}: ${eventContent.reason}`

      break
    }
    case "leave": {
      switch (prevMembership) {
        case "invite":
          content = `${user} has canceled the invitation to ${prevDisplayName}`

          break
        case "ban":
          content = `${user} has removed the ban from ${client.getUser(stateKey)?.displayName}`
          break
        case "join":
          content = `${user} has left the room`

          break
        default:
          break
      }
    }
  }

  const eventId = event.event.event_id

  if (content === null || eventId === undefined) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {text: content, timestamp, id: eventId},
  }
}

const handleGuestAccessEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let content: string | null = null

  // TODO: Handle here other types of guest_access
  switch (event.getContent().guest_access) {
    case "can_join":
      content = `${user} authorized anyone to join the room`
      break
    case "forbidden":
      content = `${user} has prohibited guests from joining the room`
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

const handleJoinRulesEvent = async (
  user: string,
  timestamp: number,
  event: MatrixEvent
): Promise<AnyMessage | null> => {
  let content: string | null = null

  // TODO: Handle here other types of join_rule
  switch (event.getContent().join_rule) {
    case "invite":
      content = `${user} restricted the room to guests`
      break
    case "public":
      content = `${user} made the room public to anyone who knows the link.`
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

  return {
    kind: MessageKind.Event,
    data: {
      text: `${user} has change to the topic to <<${topic}>>`,
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

  const content =
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
      text: content,
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
  const content =
    event.getContent().url === undefined
      ? `${user} has remove the avatar for this room`
      : `${user} changed the avatar of the room`

  const eventId = event.event.event_id

  if (eventId === undefined) {
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

export default useActiveRoom
