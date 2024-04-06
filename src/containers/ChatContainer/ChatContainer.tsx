import {useEffect, useMemo, useRef, type FC} from "react"
import {assert} from "../../utils/util"
import IconButton from "../../components/IconButton"
import TypingIndicator from "../../components/TypingIndicator"
import useActiveRoom, {MessageKind} from "@/hooks/matrix/useActiveRoom"
import ImageMessage from "../../components/ImageMessage"
import TextMessage from "../../components/TextMessage"
import EventMessage from "../../components/EventMessage"
import {twMerge} from "tailwind-merge"
import Button, {ButtonVariant} from "../../components/Button"
import UnreadIndicator from "../../components/UnreadIndicator"
import {
  IoEllipsisVertical,
  IoInformationCircle,
  IoAttach,
  IoPaperPlane,
} from "react-icons/io5"
import {IoIosHappy, IoMdLink} from "react-icons/io"
import {LiaSlackHash} from "react-icons/lia"
import Modal, {ModalRenderLocation} from "../../components/Modal"
import SmartActionBar from "@/containers/SmartActionBar"
import useChatInput from "./useChatInput"

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
              top: scrollReference.scrollHeight - scrollReference.clientHeight,
              behavior: "smooth",
            })
          }}
          className="mx-4 flex max-h-full grow flex-col gap-4 overflow-y-auto scroll-smooth scrollbar-hide">
          {messages}
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

            {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
          </div>
        </div>

        <SmartActionBar />
      </div>
    </>
  )
}

type ChatInputProps = {
  value: string
  onAttach: () => void
  onSend: () => void
  onValueChange: (value: string) => void
}

const ChatInput: FC<ChatInputProps> = ({
  onAttach,
  onSend,
  onValueChange,
  value,
}) => {
  const textareaReference = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter")
      if (event.ctrlKey) {
        onValueChange(value + "\n")
      } else {
        event.preventDefault()
        onSend()
      }
  }

  useEffect(() => {
    // Move scroll to last message.
    const textarea = textareaReference.current

    if (textarea !== null) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <div className="flex gap-2">
      <div className="flex h-full items-center gap-3">
        <IconButton
          onClick={() => {
            /* TODO: Handle `emoji` button click. */
          }}
          tooltip="Emoji"
          Icon={IoIosHappy}
        />

        <IconButton onClick={onAttach} tooltip="Attach" Icon={IoAttach} />
      </div>

      <div className="flex w-full rounded-md border border-neutral-300 bg-neutral-50">
        <textarea
          onKeyDown={handleKeyDown}
          rows={1}
          ref={textareaReference}
          placeholder="Write a message or simply say 👋🏼 hello..."
          value={value}
          disabled={false}
          onChange={value => {
            onValueChange(value.target.value)
          }}
          className="flex max-h-24 w-full resize-none overflow-y-auto border-none bg-transparent p-3 scrollbar-hide focus-visible:outline-none focus-visible:outline-0"
        />

        <div className="m-1 size-max">
          <IconButton
            tooltip="Send"
            Icon={IoPaperPlane}
            color="#C463FF"
            isDisabled={false}
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  )
}

const ChatHeader: FC<{roomName: string}> = ({roomName}) => {
  assert(roomName.length > 0, "room name should not be empty")

  return (
    <header className="flex items-center gap-2 border-b border-b-stone-200 p-3">
      <div className="m-2 flex w-full gap-1">
        <LiaSlackHash className="text-purple-500" />

        <span className="text-purple-500">{roomName}</span>

        {/* <span className="text-stone-600">{text}</span> */}
      </div>

      <IconButton
        onClick={() => {
          /* TODO: Handle `info` button click. */
        }}
        tooltip="Room details"
        Icon={IoInformationCircle}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `link` button click. */
        }}
        tooltip="Copy link"
        Icon={IoMdLink}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `more` button click. */
        }}
        tooltip="More actions"
        Icon={IoEllipsisVertical}
      />
    </header>
  )
}

export default ChatContainer
