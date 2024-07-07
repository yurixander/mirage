import useConnection from "@/hooks/matrix/useConnection"
import useDebounced from "@/hooks/util/useDebounced"
import {MsgType} from "matrix-js-sdk"
import {useEffect, useState} from "react"

const useChatInput = (roomId: string) => {
  const {client} = useConnection()
  const [messageText, setMessageText] = useState("")
  const debouncedText = useDebounced(messageText, 500)

  const sendTextMessage = async (text: string) => {
    if (client === null) {
      return
    }

    try {
      setMessageText("")

      await client.sendMessage(roomId, {
        body: text,
        msgtype: MsgType.Text,
      })
    } catch (error) {
      // TODO: Show toast when an error has occurred.

      console.error("Error sending message:", error)
    }
  }

  useEffect(() => {
    if (debouncedText.length === 0 || client === null) {
      return
    }

    void client.sendTyping(roomId, true, 2000)
  }, [client, debouncedText, roomId])

  return {
    messageText,
    setMessageText,
    isDisabled: client === null,
    sendTextMessage,
  }
}

export default useChatInput
