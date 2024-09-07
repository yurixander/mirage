import ChatInput from "@/containers/RoomContainer/ChatInput"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [message, setMessage] = useState("")

  return (
    <>
      <div className="absolute">{message}</div>

      <div className="flex size-full items-end">
        <ChatInput
          isInputDisabled={false}
          roomId=""
          onSendMessageText={messageSendRequest => {
            setMessage(messageSendRequest.messageText)
          }}
          onPickFile={file => {
            throw new Error("Attach file not implemented.")
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
