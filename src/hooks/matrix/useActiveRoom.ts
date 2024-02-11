import {type TextMessageProps} from "@/components/TextMessage"
import useConnection from "@/hooks/matrix/useConnection"
import {
  EventType,
  type IEventWithRoomId,
  MsgType,
  type Room,
  type MatrixClient,
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

const useActiveRoom = () => {
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const {client} = useConnection()
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<TextMessageProps[]>([])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      throw new Error(`Room with ID ${activeRoomId} does not exist`)
    }

    setActiveRoom(room)

    // TODO: Abstract to a function that obtains the messages and returns each one in ready-made components, and provide said function.
    client
      .roomInitialSync(activeRoomId, 30)
      .then(roomData => {
        const messages = roomData.messages?.chunk
          .filter(message => message.type === EventType.RoomMessage)
          .filter(message => message.content.msgtype === MsgType.Text)

        setMessages(transformToTextMessage(client, messages))
      })
      .catch(error => {
        console.error("Error fetching messages:", error)
      })
  }, [client, activeRoomId])

  return {activeRoomId, activeRoom, setActiveRoomId, messages}
}

const transformToTextMessage = (
  client: MatrixClient,
  messages?: IEventWithRoomId[]
): TextMessageProps[] => {
  if (messages === undefined) {
    return []
  }
  const textMessages: TextMessageProps[] = []

  for (const message of messages) {
    const user = client.getUser(message.sender)
    const timestamp = message.unsigned?.age ?? Date.now()

    if (user === null) {
      continue
    }

    const avatarUrl =
      user.avatarUrl === undefined
        ? undefined
        : client.mxcUrlToHttp(user.avatarUrl) ?? undefined

    textMessages.push({
      authorAvatarUrl: avatarUrl,
      authorDisplayName: user.displayName ?? user.userId,
      authorDisplayNameColor: "",
      id: parseInt(message.event_id),
      onAuthorClick: () => {},
      text: message.content.body,
      timestamp,
    })
  }

  return textMessages
}

export default useActiveRoom
