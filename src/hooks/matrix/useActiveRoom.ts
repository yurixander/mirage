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
} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import {create} from "zustand"

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

  return {activeRoomId, activeRoom, setActiveRoomId, messages}
}

const handleRoomEvents = async (
  client: MatrixClient,
  activeRoomId: string
): Promise<MessageProps[]> => {
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
      return await roomMemberEventTransformer(event, user, timestamp)
    case EventType.RoomTopic:
      return await roomTopicTransformer(event, user, timestamp)
    case EventType.RoomGuestAccess:
      return await roomGuestAccessTransformer(event, user, timestamp)
    case EventType.RoomHistoryVisibility:
      return await roomHistoryVisibilityTransformer(event, user, timestamp)
    case EventType.RoomJoinRules:
      return await roomJoinRulesTransformer(event, user, timestamp)
    case EventType.RoomCanonicalAlias:
      return await roomCanonicalAliasTransformer(event, user, timestamp)
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

const roomMemberEventTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  const membership = event.content.membership
  let content: string | null = null

  switch (membership) {
    // TODO: Handle here other types of RoomMember events
    case "join":
      if (event.content.avatar_url !== undefined) {
        content = `${event.content.displayname} has change to the profile photo`
      } else {
        content = `${event.content.displayname} has joined to the room`
      }
      break
    case "invite":
      content = `${user} invited ${event.content.displayname}`
      break
  }

  if (content === null) {
    return null
  }

  return {
    kind: MessageKind.Event,
    data: {text: content, timestamp},
  }
}

const roomGuestAccessTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  // TODO: Handle here other types of guest_access
  switch (event.content.guest_access) {
    case "can_join":
      content = `${user} authorized anyone to join the room`
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

const roomJoinRulesTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  // TODO: Handle here other types of join_rule
  switch (event.content.join_rule) {
    case "invite":
      content = `${user} restricted the room to guests`
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

const roomTopicTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  return {
    kind: MessageKind.Event,
    data: {
      text: `${user} has change to the topic to ${event.content.topic}`,
      timestamp,
    },
  }
}

const roomHistoryVisibilityTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  let content: string | null = null

  // TODO: Handle here other types of history_visibility
  switch (event.content.history_visibility) {
    case "shared":
      content = `${user} made the future history of the room visible to all members of the room`
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

const roomCanonicalAliasTransformer = async (
  event: IEventWithRoomId,
  user: string,
  timestamp: number
): Promise<MessageProps | null> => {
  return {
    kind: MessageKind.Event,
    data: {
      text: `${user} set the main address for this room as ${event.content.alias}`,
      timestamp,
    },
  }
}

export default useActiveRoom
