import {type EventMessageProps} from "@/components/EventMessage"
import {type ImageMessageProps} from "@/components/ImageMessage"
import {type TextMessageProps} from "@/components/TextMessage"
import useConnection from "@/hooks/matrix/useConnection"
import {
  EventType,
  type IEventWithRoomId,
  MsgType,
  type Room,
  type MatrixClient,
  type User,
  RoomMemberEvent,
  RoomEvent,
} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import {create} from "zustand"
import useEventListener from "./useEventListener"

type ActiveRoomIdStore = {
  activeRoomId: string | null
  setActiveRoomId: (roomId: string) => void
}

export const useActiveRoomIdStore = create<ActiveRoomIdStore>(set => ({
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

type MessageOf<T extends MessageKind> = T extends MessageKind.Text
  ? TextMessageProps
  : T extends MessageKind.Image
    ? ImageMessageProps
    : EventMessageProps

type Message<T extends MessageKind> = {
  kind: T
  data: MessageOf<T>
}

// TODO: Make the compiler recognize when it is one and when it is another.
type MessageProps = Message<MessageKind>

const useActiveRoom = () => {
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const {client} = useConnection()
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [usersTyping, setUserTyping] = useState<string[]>([])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      throw new Error(`Room with ID ${activeRoomId} does not exist`)
    }

    setActiveRoom(room)

    void handleRoomEvents(client, activeRoomId)
      .then(messagesAndEvents => {
        setMessages(messagesAndEvents)
      })
      .catch(error => {
        console.error("Error fetching events:", error)
      })
  }, [client, activeRoomId])

  // TODO: Abstract logic on a function and the listeners should be called before the client.startClient()
  useEventListener(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    // TODO: Check why event here is not equals with event for `client.roomInitialSync`
    if (
      room.roomId !== activeRoomId ||
      event.getContent().msgtype !== MsgType.Text ||
      client === null
    ) {
      return
    }

    const sender = event.getSender()

    if (sender === undefined) {
      return
    }

    const user = client.getUser(sender)
    const timestamp = event.localTimestamp
    const eventID = event.getAge() ?? timestamp

    if (user === null) {
      return
    }

    const avatarUrl =
      user.avatarUrl === undefined
        ? undefined
        : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

    setMessages([
      ...messages,
      {
        kind: MessageKind.Text,
        data: {
          authorAvatarUrl: avatarUrl,
          authorDisplayName: user.displayName ?? user.userId,
          authorDisplayNameColor: "",
          id: eventID,
          onAuthorClick: () => {},
          text: event.getContent().body,
          timestamp,
        },
      },
    ])
  })

  const sendMessage = async (msgtype: MsgType, body: string) => {
    if (activeRoomId === null) {
      return
    }

    await client?.sendMessage(activeRoomId, {body, msgtype})
  }

  const userId = client?.getUserId()

  client?.on(RoomMemberEvent.Typing, (event, member) => {
    if (member.userId === userId) {
      return
    }

    if (member.typing) {
      setUserTyping([member.name, ...usersTyping])
    } else {
      setUserTyping(usersTyping.filter(user => user !== member.name))
    }
  })

  const sendEventTyping = async () => {
    if (activeRoomId === null) {
      return
    }

    await client?.sendTyping(activeRoomId, true, 2000)
  }

  return {
    activeRoomId,
    activeRoom,
    setActiveRoomId,
    messages,
    sendMessage,
    usersTyping,
    sendEventTyping,
  }
}

const handleRoomEvents = async (
  client: MatrixClient,
  activeRoomId: string
): Promise<MessageProps[]> => {
  // TODO: Check why event here is not equals with event for ´RoomEvent.Timeline´ listener
  const events = (await client.roomInitialSync(activeRoomId, 30)).messages
    ?.chunk

  if (events === undefined) {
    return []
  }

  const messagesProp: MessageProps[] = []

  for (const event of events) {
    const messageProp = await handleEvents(event, client)

    if (messageProp === null) {
      continue
    }

    messagesProp.push(messageProp)
  }

  return messagesProp
}

// TODO: This functions can move to a separate file
const handleEvents = async (
  event: IEventWithRoomId,
  client: MatrixClient
): Promise<MessageProps | null> => {
  const timestamp = event.unsigned?.age
  const user = client.getUser(event.sender)?.displayName

  if (timestamp === undefined || user === undefined) {
    return null
  }

  switch (event.type) {
    case EventType.RoomMessage:
      return await handleMessagesEvent(event, client)
    case EventType.RoomMember:
      return await handleMemberEvent(event, user, timestamp, client)
    case EventType.RoomTopic:
      return await handleRoomTopicEvent(event, user, timestamp)
    case EventType.RoomGuestAccess:
      return await handleGuestAccessEvent(event, user, timestamp)
    case EventType.RoomHistoryVisibility:
      return await handleHistoryVisibilityEvent(event, user, timestamp)
    case EventType.RoomJoinRules:
      return await handleJoinRulesEvent(event, user, timestamp)
    case EventType.RoomCanonicalAlias:
      return await handleRoomCanonicalAliasEvent(event, user, timestamp)
    case EventType.RoomAvatar:
      return await handleRoomAvatarEvent(event, user, timestamp)
  }

  return null
}

const handleMessagesEvent = async (
  message: IEventWithRoomId,
  client: MatrixClient
): Promise<MessageProps | null> => {
  const user = client.getUser(message.sender)
  const timestamp = message.unsigned?.age

  if (user === null || timestamp === undefined) {
    return null
  }

  switch (message.content.msgtype) {
    case MsgType.Text: {
      const messageTextProp = transformToTextMessage(
        client,
        message,
        user,
        timestamp
      )

      if (messageTextProp === null) {
        return null
      }

      return {kind: MessageKind.Text, data: messageTextProp}
    }
    case MsgType.Image: {
      const messageImgProp = transformToImageMessage(
        client,
        message,
        user,
        timestamp
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

const transformToImageMessage = (
  client: MatrixClient,
  message: IEventWithRoomId,
  user: User,
  timestamp: number
): ImageMessageProps => {
  const content = message.content

  // TODO: Check why not scale the Img and prefer remove content.info
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

  return {
    authorAvatarUrl: avatarUrl,
    authorDisplayName: user.displayName ?? user.userId,
    authorDisplayNameColor: "",
    id: parseInt(message.event_id),
    onAuthorClick: () => {},
    text: "",
    timestamp,
    imageUrl: imgUrl ?? "",
  }
}

const transformToTextMessage = (
  client: MatrixClient,
  message: IEventWithRoomId,
  user: User,
  timestamp: number
): TextMessageProps => {
  const avatarUrl =
    user.avatarUrl === undefined
      ? undefined
      : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

  return {
    authorAvatarUrl: avatarUrl,
    authorDisplayName: user.displayName ?? user.userId,
    authorDisplayNameColor: "",
    id: parseInt(message.event_id),
    onAuthorClick: () => {},
    text: message.content.body,
    timestamp,
  }
}

const handleMemberEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number,
  client: MatrixClient
): Promise<MessageProps | null> => {
  const membership = event.content.membership
  let content: string | null = null

  switch (membership) {
    // TODO: Handle here other types of RoomMember events
    case "join": {
      if (
        event.unsigned?.prev_content?.membership === "invite" ||
        event.unsigned?.prev_content?.membership !== "join"
      ) {
        content = `${event.content.displayname} has joined to the room`
      } else if (
        event.unsigned?.prev_content?.displayname !== undefined &&
        event.content.displayname !== event.unsigned?.prev_content?.displayname
      ) {
        content = `${event.unsigned?.prev_content?.displayname} has change the name to ${event.content.displayname}`
      } else if (
        event.content.avatar_url !== undefined &&
        event.unsigned?.prev_content?.avatar_url === undefined
      ) {
        content = `${event.content.displayname} has put a profile photo`
      } else if (
        event.content.avatar_url !== undefined &&
        event.content.avatar_url !== event.unsigned?.prev_content?.avatar_url
      ) {
        content = `${event.content.displayname} has change to the profile photo`
      } else if (
        event.content.avatar_url === undefined &&
        event.unsigned?.prev_content?.avatar_url !== undefined
      ) {
        content = `${event.content.displayname} has remove the profile photo`
      }
      break
    }
    case "invite":
      content = `${user} invited ${event.content.displayname}`
      break
    case "ban": {
      content = `${user} has banned ${event.unsigned?.prev_content?.displayname}: ${event.content.reason}`
      break
    }
    case "leave": {
      switch (event.unsigned?.prev_content?.membership) {
        case "invite":
          content = `${user} has canceled the invitation to ${event.unsigned?.prev_content?.displayname}`
          break
        // case "ban":
        //   // TODO: Check here why state_key not exists
        //   content = `${user} has removed the ban from ${client.getUser(event.state_key as string)?.displayName}`
        //   break
        case "join":
          content = `${user} has left the room`
          break
        default:
          break
      }
    }
  }

  if (content === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {text: content, timestamp},
  }
}

const handleGuestAccessEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  // TODO: Handle here other types of guest_access
  switch (event.content.guest_access) {
    case "can_join":
      content = `${user} authorized anyone to join the room`
      break
    case "forbidden":
      content = `${user} has prohibited guests from joining the room`
      break
  }

  if (content === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
    },
  }
}

const handleJoinRulesEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  // TODO: Handle here other types of join_rule
  switch (event.content.join_rule) {
    case "invite":
      content = `${user} restricted the room to guests`
      break
    case "public":
      content = `${user} made the room public to anyone who knows the link.`
      break
  }

  if (content === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
    },
  }
}

const handleRoomTopicEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  return {
    kind: MessageKind.Event,
    data: {
      text: `${user} has change to the topic to <<${event.content.topic}>>`,
      timestamp,
    },
  }
}

const handleHistoryVisibilityEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  switch (event.content.history_visibility) {
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

  if (content === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
    },
  }
}

const handleRoomCanonicalAliasEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  const content =
    event.content.alias === undefined
      ? `${user} has remove the main address for this room`
      : `${user} set the main address for this room as ${event.content.alias}`

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
    },
  }
}

const handleRoomAvatarEvent = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  const content =
    event.content.url === undefined
      ? `${user} has remove the avatar for this room`
      : `${user} changed the avatar of the room`

  return {
    kind: MessageKind.Event,
    data: {
      text: content,
      timestamp,
    },
  }
}

export default useActiveRoom
