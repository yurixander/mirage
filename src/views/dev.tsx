import {ChatMessages} from "@/containers/RoomContainer/ChatMessages"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ChatMessages
        messagesState={{status: "error", error: new Error("A fatal error")}}
        onReloadMessages={function (): void {
          throw new Error("Function not implemented.")
        }}
        onCloseRoom={function (): void {
          throw new Error("Function not implemented.")
        }}
      />
    </div>
  )
}

export default DevelopmentPreview
