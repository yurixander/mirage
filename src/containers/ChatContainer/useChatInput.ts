import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import useDebounced from "@/hooks/util/useDebounced"
import {useCallback, useEffect, useState} from "react"

const useChatInput = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const [messageText, setMessageText] = useState("")
  const debouncedText = useDebounced(messageText, 500)

  const sendEventTyping = useCallback(async () => {
    if (activeRoomId === null || client === null) {
      return
    }

    await client.sendTyping(activeRoomId, true, 2000)
  }, [activeRoomId, client])

  useEffect(() => {
    if (debouncedText === "") {
      return
    }

    void sendEventTyping()
  }, [debouncedText, sendEventTyping])

  return {messageText, setMessageText}
}

export default useChatInput
