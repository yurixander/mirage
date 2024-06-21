import TypingIndicator from "../../components/TypingIndicator"
import useActiveRoom, {RoomState} from "@/hooks/matrix/useActiveRoom"
import {twMerge} from "tailwind-merge"
import useChatInput from "./useChatInput"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import {type FC} from "react"
import WelcomeSplash from "./WelcomeSplash"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"
import {createPortal} from "react-dom"
import Typography, {TypographyVariant} from "@/components/Typography"
import Loader from "@/components/Loader"
import {ChatMessages} from "./ChatMessages"
import Button, {ButtonVariant} from "@/components/Button"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const {messageText, setMessageText} = useChatInput()

  const {
    messagesProp,
    typingUsers,
    sendTextMessage,
    roomName,
    openFilePicker,
    activeRoomId,
    roomState,
    messagesState,
    imagePreviewProps,
  } = useActiveRoom()

  return (
    <>
      {imagePreviewProps !== undefined && (
        <ImageModalPreview {...imagePreviewProps} />
      )}

      <div
        className="relative flex size-full"
        id={ModalRenderLocation.ChatContainer}>
        {activeRoomId === null ? (
          <WelcomeSplash />
        ) : roomState === RoomState.Prepared ? (
          <div className={twMerge("flex h-screen flex-col gap-4", className)}>
            <ChatHeader roomName={roomName} />

            <ChatMessages
              messages={messagesProp}
              messagesState={messagesState}
            />

            <div className="mx-4 flex flex-col gap-3">
              <ChatInput
                onAttach={openFilePicker}
                onValueChange={setMessageText}
                value={messageText}
                onSend={() => {
                  void sendTextMessage(messageText).then(() => {
                    setMessageText("")
                  })
                }}
              />

              <div className="flex gap-3">
                <div className="size-6" />

                <div className="size-6" />

                {typingUsers.length > 0 && (
                  <TypingIndicator users={typingUsers} />
                )}
              </div>
            </div>
          </div>
        ) : roomState === RoomState.Loading ? (
          <ChatLoading />
        ) : (
          <ChatNotFound />
        )}
      </div>
    </>
  )
}

export type ImageModalPreviewProps = {
  imageUrl: string
  imageName: string
  onClear: () => void
  onSendImage: () => void
}

const ImageModalPreview: FC<ImageModalPreviewProps> = ({
  imageName,
  imageUrl,
  onSendImage,
  onClear,
}) => {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-50 flex size-full w-screen flex-col items-center justify-center bg-modalOverlay">
          <div className="flex max-h-[600px] max-w-xl flex-col gap-4 rounded-xl bg-slate-50 p-6 px-8 shadow-md">
            <img
              className="h-auto w-full rounded-lg object-cover shadow-md"
              src={imageUrl}
              alt={imageName}
            />
            <div className="flex w-full items-center justify-end gap-1">
              <Button
                variant={ButtonVariant.Secondary}
                onClick={onClear}
                label="Cancel"
              />

              <Button
                variant={ButtonVariant.Primary}
                label="Send Image"
                onClick={() => {
                  onSendImage()
                  onClear()
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

const ChatNotFound: FC = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <Typography variant={TypographyVariant.HeadingMedium}>
        Fatal error
      </Typography>

      <Typography>
        You not have access to this room or this room not found
      </Typography>
    </div>
  )
}

const ChatLoading: FC = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <Loader text="Loading room" />
    </div>
  )
}

export default ChatContainer
