import useDebounced from "@/hooks/util/useDebounced"
import {sendImageMessageFromFile} from "@/utils/util"
import {MsgType} from "matrix-js-sdk"
import {useEffect, useMemo, useState} from "react"
import {useFilePicker} from "use-file-picker"
import {type ImageModalPreviewProps} from "./ImageModalPreview"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"

type UseChatInputReturnType = {
  messageText: string
  setMessageText: React.Dispatch<React.SetStateAction<string>>
  isDisabled: boolean
  isInputDisabled: boolean
  sendTextMessage: (text: string) => Promise<void>
  openFilePicker: () => void
  imagePreviewProps: ImageModalPreviewProps | undefined
}

const useChatInput = (roomId: string): UseChatInputReturnType => {
  const client = useMatrixClient()
  const [messageText, setMessageText] = useState("")
  const debouncedText = useDebounced(messageText, 500)

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  const imagePreviewProps = useMemo(() => {
    if (filesContent.length <= 0) {
      return
    }

    const imageModalPreviewProps: ImageModalPreviewProps = {
      imageName: filesContent[0].name,
      imageUrl: filesContent[0].content,
      onClear: clear,
      onSendImage() {
        void sendImageMessageFromFile(filesContent[0], client, roomId).then(
          () => {
            clear()
          }
        )
      },
    }

    return imageModalPreviewProps
  }, [clear, client, filesContent, roomId])

  const sendTextMessage = async (text: string): Promise<void> => {
    if (client === null || text.length === 0) {
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
    isDisabled: client === null || messageText.length === 0,
    isInputDisabled: client === null,
    sendTextMessage,
    openFilePicker,
    imagePreviewProps,
  }
}

export default useChatInput
