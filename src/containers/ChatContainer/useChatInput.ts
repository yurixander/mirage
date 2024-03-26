import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import useDebounced from "@/hooks/util/useDebounced"
import {useCallback, useEffect, useState} from "react"

const useChatInput = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const [query, setQuery] = useState("")
  const debouncedText = useDebounced(query, 500)

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

  return {query, setQuery}
}

export default useChatInput
