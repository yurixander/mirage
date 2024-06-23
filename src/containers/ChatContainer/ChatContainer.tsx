import TypingIndicator from "../../components/TypingIndicator"
import useActiveRoom, {RoomState} from "@/hooks/matrix/useActiveRoom"
import {twMerge} from "tailwind-merge"
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
import useChatInput from "./useChatInput"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const {messageText, setMessageText} = useChatInput()

  const {
    client,
    messagesProp,
    typingUsers,
    sendTextMessage,
    roomName,
    openFilePicker,
    roomState,
    messagesState,
    imagePreviewProps,
  } = useActiveRoom()

  return (
    <>
      <>
        {imagePreviewProps !== undefined && (
          <ImageModalPreview {...imagePreviewProps} />
        )}

        <div
          className="relative flex size-full"
          id={ModalRenderLocation.ChatContainer}>
          {roomState === RoomState.Idle ? (
            <WelcomeSplash />
          ) : roomState === RoomState.NotFound ? (
            <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
              <Typography variant={TypographyVariant.HeadingLarge}>
                Room Not Found
              </Typography>

              <Typography>
                You not have access to this room or this room not found.
              </Typography>
            </div>
          ) : roomState === RoomState.Loading ? (
            <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
              <Loader text="Loading room" />
            </div>
          ) : (
            <div
              className={twMerge("flex size-full flex-col gap-1", className)}>
              <ChatHeader className="size-full shrink-0" roomName={roomName} />

              <ChatMessages
                messages={messagesProp}
                messagesState={messagesState}
              />

              <div className="mx-4 flex shrink-0 flex-col gap-3">
                {/* TODO: Temporally remove this later */}
                {roomState === RoomState.Invited && (
                  <Typography>Send message for join to this room</Typography>
                )}

                <ChatInput
                  isDisabled={
                    client === null || roomState === RoomState.Joining
                  }
                  onAttach={openFilePicker}
                  onValueChange={setMessageText}
                  value={messageText}
                  onSend={() => {
                    void sendTextMessage(messageText)

                    setMessageText("")
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
          )}
        </div>
      </>
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

export default ChatContainer
