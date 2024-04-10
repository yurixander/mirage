import TypingIndicator from "../../components/TypingIndicator"
import useActiveRoom, {
  MessageKind,
  MessagesState,
} from "@/hooks/matrix/useActiveRoom"
import ImageMessage from "../../components/ImageMessage"
import TextMessage from "../../components/TextMessage"
import EventMessage from "../../components/EventMessage"
import {twMerge} from "tailwind-merge"
import Button, {ButtonVariant} from "../../components/Button"
import UnreadIndicator from "../../components/UnreadIndicator"
import Modal, {ModalRenderLocation} from "../../components/Modal"
import SmartActionBar from "@/containers/SmartActionBar"
import useChatInput from "./useChatInput"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import {useMemo, type FC} from "react"
import WelcomeChat from "./WelcomeChat"
import MessagesPlaceholder from "./MessagesPlaceholder"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const {messageText, setMessageText} = useChatInput()

  const {
    messagesProp,
    typingUsers,
    sendImageMessage,
    sendTextMessage,
    roomName,
    filesContent,
    clear,
    openFilePicker,
    activeRoomId,
    messagesState,
  } = useActiveRoom()

  const messages = useMemo(
    () =>
      messagesProp.map(message =>
        message.kind === MessageKind.Text ? (
          <TextMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Image ? (
          <ImageMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Event ? (
          <EventMessage key={message.data.id} {...message.data} />
        ) : (
          <UnreadIndicator key="unread-indicator" {...message.data} />
        )
      ),
    [messagesProp]
  )

  return (
    <>
      <Modal isVisible={filesContent.length > 0}>
        <div className="flex max-h-[600px] max-w-xl flex-col gap-4 rounded-xl bg-slate-50 p-6 px-8 shadow-md">
          {filesContent.length > 0 && (
            <img
              className="h-auto w-full rounded-lg object-cover shadow-md"
              src={filesContent[0].content}
              alt={filesContent[0].name}
            />
          )}
          <div className="flex w-full items-center justify-end gap-1">
            <Button
              variant={ButtonVariant.Secondary}
              onClick={clear}
              label="Cancel"
            />
            <Button
              onClick={() => {
                void sendImageMessage()
              }}
              label="Send Image"
            />
          </div>
        </div>
      </Modal>

      {activeRoomId === null ? (
        <WelcomeChat />
      ) : (
        <div
          id={ModalRenderLocation.ChatContainer}
          className={twMerge(
            "flex h-screen flex-col gap-4 border border-stone-200",
            className
          )}>
          <ChatHeader roomName={roomName} />

          <div
            ref={scrollReference => {
              if (scrollReference === null) {
                return
              }

              scrollReference.scrollTo({
                top:
                  scrollReference.scrollHeight - scrollReference.clientHeight,
                behavior: "smooth",
              })
            }}
            className="mx-4 flex max-h-full grow flex-col gap-4 overflow-y-auto scroll-smooth scrollbar-hide">
            {messagesState === MessagesState.Loaded ? (
              messages
            ) : (
              <MessagesPlaceholder />
            )}
          </div>

          <div className="mx-4 flex flex-col gap-3">
            <ChatInput
              onAttach={openFilePicker}
              onSend={() => {
                void sendTextMessage(messageText)

                setMessageText("")
              }}
              onValueChange={setMessageText}
              value={messageText}
            />

            <div className="flex gap-3">
              <div className="size-6" />

              <div className="size-6" />

              {typingUsers.length > 0 && (
                <TypingIndicator users={typingUsers} />
              )}
            </div>
          </div>

          <SmartActionBar />
        </div>
      )}
    </>
  )
}

export default ChatContainer
