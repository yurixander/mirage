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
import useFilePicker from "@/hooks/util/useFilePicker"
import FilePreview from "@/components/FilePreview"

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
  const {contentPicked, onPickFile, clear} = useFilePicker(false, "file/*")

  const {
    messagesState,
    roomDetail,
    lastMessageReadId,
    onLastMessageReadIdChange,
    isChatLoading,
    typingUsers,
    sendTypingEvent,
    isInputDisabled,
    sendMessageText,
    onSendAudioMessage,
    onSendSourceMessage,
    onReloadMessages,
  } = useRoomChat(roomId)

  assert(roomId.length > 0, "The roomId should not be empty.")

  return isChatLoading ? (
    <div className="flex size-full items-center justify-center">
      <Loader text={t(LangKey.LoadingRoom)} />
    </div>
  ) : (
    <>
      {contentPicked !== null &&
        !contentPicked.isMultiple &&
        contentPicked.pickerResult !== null && (
          <FilePreview
            fileName={contentPicked.pickerResult.name}
            fileSize={contentPicked.pickerResult.size}
            open={contentPicked.pickerResult !== null}
            onOpenChange={isOpen => {
              if (isOpen) {
                return
              }

              clear()
            }}
            onSend={async () => {
              if (contentPicked.pickerResult === null) {
                return
              }

              await onSendSourceMessage(contentPicked.pickerResult, roomId)
            }}
          />
        )}

      <div
        className={twMerge(
          "flex h-full flex-col dark:bg-neutral-900",
          className
        )}>
        <ChatHeader
          isRosterExpanded={isRosterExpanded}
          onRosterExpanded={onRosterExpanded}
          roomDetail={roomDetail}
          onCloseRoom={clearActiveRoomId}
        />

        <ChatMessages
          lastMessageReadId={lastMessageReadId}
          messagesState={messagesState}
          onReloadMessages={onReloadMessages}
          onCloseRoom={clearActiveRoomId}
          onLastMessageReadIdChange={onLastMessageReadIdChange}
        />

        <footer className="order-3 flex flex-col px-3.5 pt-2">
          <ChatInput
            onSendTypingEvent={sendTypingEvent}
            isInputDisabled={isInputDisabled}
            roomId={roomId}
            onSendMessageText={sendMessageText}
            onPickFile={onPickFile}
            onSendAudio={async audioBlob => {
              await onSendAudioMessage(audioBlob, roomId)
            }}
          />

          <div className="flex size-full max-h-9 flex-col">
            <div className="flex gap-2">
              <div className="h-9" />

              <div className="h-9" />

              {typingUsers.length > 0 && (
                <TypingIndicator users={typingUsers} />
              )}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default ChatContainer
