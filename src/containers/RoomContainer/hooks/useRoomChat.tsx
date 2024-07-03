import {type MessagesState} from "@/hooks/matrix/useActiveRoom"
import {useState} from "react"

const useRoomChat = (roomId: string) => {
  const [messagesState, setMessagesState] = useState<MessagesState>()

  // TODO: Handle listeners for room name ect...
  return {messagesState, setMessagesState}
}

export default useRoomChat
