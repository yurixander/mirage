import {type FC} from "react"
import useRoomChat from "./hooks/useRoomChat"
import ChatHeader from "../ChatContainer/ChatHeader"
import {ChatMessages} from "../ChatContainer/ChatMessages"
import ChatInput from "../ChatContainer/ChatInput"
import TypingIndicator from "@/components/TypingIndicator"
import Loader from "@/components/Loader"

type ChatContainerProps = {
  roomId: string
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({roomId, className}) => {
  const {messagesState, roomName, isChatLoading, messages, typingUsers} =
    useRoomChat(roomId)

  return isChatLoading ? (
    <div className="flex size-full items-center justify-center">
      <Loader text="Loading room" />
    </div>
  ) : (
    <div className={className}>
      <ChatHeader
        className="flex size-full max-h-12 shrink-0 items-center gap-2 border-b border-b-stone-200 px-3"
        roomName={roomName}
      />

      <ChatMessages
        className="size-full max-h-[450px] shrink-0 p-3"
        messages={messages}
        messagesState={messagesState}
      />

      <ChatInput roomId={roomId} className="size-full" />

      <div className="mx-4 flex size-full max-h-12 shrink-0 flex-col gap-3">
        <div className="flex gap-3">
          <div className="size-6" />

          <div className="size-6" />

          {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
