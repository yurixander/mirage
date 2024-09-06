import ChatInput from "@/containers/RoomContainer/ChatInput"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        <ChatInput roomId={""} isInputDisabled={false} />
      </div>
    </>
  )
}

export default DevelopmentPreview
