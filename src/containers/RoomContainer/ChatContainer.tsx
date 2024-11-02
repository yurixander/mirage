import {type FC} from "react"
import useRoomChat from "./hooks/useRoomChat"
import ChatHeader from "./ChatHeader"
import {ChatMessages} from "./ChatMessages"
import ChatInput from "./ChatInput"
import TypingIndicator from "@/components/TypingIndicator"
import Loader from "@/components/Loader"
import {twMerge} from "tailwind-merge"
import {assert} from "@/utils/util"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

type ChatContainerProps = {
  roomId: string
  isRosterExpanded: boolean
  onRosterExpanded: (isExpanded: boolean) => void
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({
  roomId,
  isRosterExpanded,
  onRosterExpanded,
  className,
}) => {
  const {t} = useTranslation()
  const {clearActiveRoomId} = useActiveRoomIdStore()

  const {
    messagesState,
    roomDetail,
    isChatLoading,
    typingUsers,
    sendTypingEvent,
    isInputDisabled,
    sendMessageText,
    onSendAudioMessage,
    onReloadMessages,
  } = useRoomChat(roomId)

  assert(roomId.length > 0, "The roomId should not be empty.")

  return isChatLoading ? (
    <div className="flex size-full items-center justify-center">
      <Loader text={t(LangKey.LoadingRoom)} />
    </div>
  ) : (
    <div
      className={twMerge(
        "flex h-full flex-col dark:bg-neutral-900",
        className
      )}>
      <ChatHeader
        className="relative flex size-full max-h-12 items-center border-b border-b-neutral-200 px-3 py-1 dark:border-b-neutral-700"
        isRosterExpanded={isRosterExpanded}
        onRosterExpanded={onRosterExpanded}
        roomDetail={roomDetail}
        onCloseRoom={clearActiveRoomId}
      />

      <ChatMessages
        className="p-3"
        messagesState={messagesState}
        onReloadMessages={onReloadMessages}
        onCloseRoom={clearActiveRoomId}
      />

      <footer className="order-3 flex flex-col px-3.5">
        <ChatInput
          onSendTypingEvent={sendTypingEvent}
          isInputDisabled={isInputDisabled}
          roomId={roomId}
          onSendMessageText={sendMessageText}
          onPickFile={_file => {
            // TODO: Handle files preview here.
          }}
          onSendAudio={async audioBlob => {
            await onSendAudioMessage(audioBlob, roomId)
          }}
        />

        <div className="flex size-full max-h-9 flex-col">
          <div className="flex gap-2">
            <div className="h-9" />

            <div className="h-9" />

            {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ChatContainer
