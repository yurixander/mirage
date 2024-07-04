import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import useRoomChat from "./hooks/useRoomChat"
import {RoomMembershipState} from "@/hooks/matrix/useActiveRoom"
import RoomInvitedSplash from "../ChatContainer/RoomInvitedSplash"
import ChatHeader from "../ChatContainer/ChatHeader"
import {ChatMessages} from "../ChatContainer/ChatMessages"
import ChatInput from "../ChatContainer/ChatInput"

type ChatContainerProps = {
  roomId: string
  roomState: RoomMembershipState.Invited | RoomMembershipState.Joined
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({
  roomId,
  roomState,
  className,
}) => {
  const {messagesState, roomName, isChatLoading, messages} = useRoomChat(roomId)

  return roomState === RoomMembershipState.Invited ? (
    <RoomInvitedSplash roomId={roomId} />
  ) : isChatLoading ? (
    <></>
  ) : (
    <div className={twMerge(className)}>
      <ChatHeader
        className="flex size-full max-h-10 items-center gap-2 border-b border-b-stone-200 px-3"
        roomName={roomName}
      />

      <ChatMessages
        className="size-full max-h-[450px] shrink-0 p-2"
        messages={messages}
        messagesState={messagesState}
      />

      <ChatInput roomId={roomId} className="size-full max-h-14 shrink-0" />

      <div id="Typing Users" className="size-full max-h-12 bg-fuchsia-500" />
    </div>
  )
}

export default ChatContainer
