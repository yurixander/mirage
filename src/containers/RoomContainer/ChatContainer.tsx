import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import useRoomChat from "./hooks/useRoomChat"

type ChatContainerProps = {
  roomId: string
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({roomId, className}) => {
  const {messagesState} = useRoomChat(roomId)

  return (
    <div className={twMerge(className)}>
      <div id="ChatHeader" className="size-full max-h-10 bg-green-500" />

      <div
        id="MessageList"
        className="size-full max-h-[450px] shrink-0 bg-slate-500"
      />

      <div id="ChatInput" className="size-full max-h-14 shrink-0 bg-black" />

      <div id="Typing Users" className="size-full max-h-12 bg-fuchsia-500" />
    </div>
  )
}

export default ChatContainer
