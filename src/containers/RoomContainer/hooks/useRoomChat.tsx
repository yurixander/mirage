import {type AnyMessage, MessagesState} from "@/hooks/matrix/useActiveRoom"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import {useEffect, useState} from "react"

const useRoomChat = (roomId: string) => {
  const {client} = useConnection()
  const {clearActiveRoomId} = useActiveRoomIdStore()
  const [roomName, setRoomName] = useState("")
  const [isChatLoading, setChatLoading] = useState(false)
  const [messagesState, setMessagesState] = useState(MessagesState.NotMessages)
  const [messages, setMessages] = useState<AnyMessage[]>([])

  useEffect(() => {
    if (client === null) {
      return
    }

    setChatLoading(true)

    const room = client.getRoom(roomId)

    if (room === null) {
      clearActiveRoomId()

      return
    }

    setRoomName(room.name)

    // Fetch messages ect...

    setChatLoading(false)
  }, [clearActiveRoomId, client, roomId])

  // TODO: Handle listeners for room name ect...
  return {messagesState, isChatLoading, roomName, messages}
}

export default useRoomChat
