import {useEffect, useRef, type FC} from "react"
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    messagesState,
    roomName,
    roomTopic,
    isChatLoading,
    messages,
    typingUsers,
    sendTypingEvent,
    isInputDisabled,
    sendMessageText,
  } = useRoomChat(roomId)

  assert(roomId.length > 0, "The roomId should not be empty.")

  useEffect(() => {
    if (scrollRef.current === null || scrollRef.current.scrollTop !== 0) {
      return
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages.length])

  return isChatLoading ? (
    <div className="flex size-full items-center justify-center">
      <Loader text={t(LangKey.LoadingRoom)} />
    </div>
  ) : (
    <div className={twMerge("flex h-full flex-col", className)}>
      <ChatHeader
        className="relative flex size-full max-h-12 items-center border-b border-b-stone-200 px-3 py-1"
        isRosterExpanded={isRosterExpanded}
        onRosterExpanded={onRosterExpanded}
        roomName={roomName}
        roomDescription={roomTopic}
      />

      <div
        ref={scrollRef}
        className="relative z-10 order-2 shrink-0 grow basis-0 overflow-y-auto">
        <div className="shrink-0 grow-0 basis-auto pb-2">
          <ChatMessages
            className="relative grow p-3"
            messages={messages}
            messagesState={messagesState}
          />
        </div>
      </div>

      <footer className="order-3 flex flex-col px-3.5">
        <ChatInput
          onSendTypingEvent={sendTypingEvent}
          isInputDisabled={isInputDisabled}
          roomId={roomId}
          onSendMessageText={sendMessageText}
          onPickFile={file => {
            // TODO: Handle files preview here.
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
