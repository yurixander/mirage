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
      .then(messagesProp => {
        setMessages(messagesProp)
      })
      .catch(error => {
        console.error("Error fetching messages:", error)
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

  for (const message of events) {
    switch (message.type) {
      case EventType.RoomMessage: {
        const messageProp = await handleMessagesEvent(message, client)

        if (messageProp === null) {
          break
        }

        messagesProp.push(messageProp)
        break
      }
      default:
        break
    }
  }

  return messagesProp
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

export default useActiveRoom
