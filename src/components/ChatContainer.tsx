import {
  faCircleHalfStroke,
  faCircleInfo,
  faEarthAmerica,
  faEllipsisV,
  faFaceSmile,
  faHashtag,
  faLink,
  faPaperPlane,
  faPaperclip,
  faStarOfLife,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useEffect, useMemo, useRef, useState, type FC} from "react"
import {assert, sendImageMessageFromFile} from "../utils/util"
import IconButton from "./IconButton"
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"
import useActiveRoom, {MessageKind} from "@/hooks/matrix/useActiveRoom"
import ImageMessage, {type ImageMessageProps} from "./ImageMessage"
import TextMessage, {type TextMessageProps} from "./TextMessage"
import EventMessage from "./EventMessage"
import {twMerge} from "tailwind-merge"
import {useFilePicker} from "use-file-picker"
import {MsgType} from "matrix-js-sdk"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    activeRoom,
    messages: messageProps,
    typingUsers,
    client,
    activeRoomId,
    sendTextMessage,
    sendEventTyping,
  } = useActiveRoom()
  const {openFilePicker, filesContent} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  const messages = useMemo(
    () =>
      messageProps.map((message, index) =>
        message.kind === MessageKind.Text ? (
          <TextMessage key={index} {...(message.data as TextMessageProps)} />
        ) : message.kind === MessageKind.Image ? (
          <ImageMessage key={index} {...(message.data as ImageMessageProps)} />
        ) : (
          <EventMessage key={index} {...message.data} />
        )
      ),
    [messageProps]
  )

  useEffect(() => {
    const textarea = textareaRef.current

    if (textarea !== null) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter")
      if (event.ctrlKey) setValue(value + "\n")
      // TODO: Handle here send message with enter.
      else {
        event.preventDefault()
        void sendTextMessage(MsgType.Text, value)
        setValue("")
      }
  }

  const name = activeRoom?.name ?? " "

  assert(name.length !== 0, "room name should not be empty")

  return (
    <div
      className={twMerge(
        "flex h-screen flex-col gap-4 border-[1px] border-solid border-stone-200",
        className
      )}>
      <header className="flex items-center gap-4 border-b-[1px] border-solid border-b-stone-200 p-4">
        <div className="flex w-full gap-1">
          <FontAwesomeIcon icon={faHashtag} className="text-purple-500" />

          <span className="text-purple-500">{name}</span>

          {/* <span className="text-stone-600">{text}</span> */}
        </div>

        <IconButton
          onClick={() => {
            /* TODO: Handle `info` button click. */
          }}
          tooltip="Room details"
          icon={faCircleInfo}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `link` button click. */
          }}
          tooltip="Copy link"
          icon={faLink}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `more` button click. */
          }}
          tooltip="More actions"
          icon={faEllipsisV}
        />
      </header>
      <div
        ref={scrollRef => {
          if (scrollRef === null) {
            return
          }

          scrollRef.scrollTo({
            top: scrollRef.scrollHeight - scrollRef.clientHeight,
            behavior: "smooth",
          })
        }}
        className="mx-4 flex max-h-full grow flex-col gap-4 overflow-y-auto scroll-smooth scrollbar-hide">
        {messages}
      </div>

      <div className="mx-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="mt-[5px] flex h-max gap-3 ">
            <IconButton
              onClick={() => {
                /* TODO: Handle `emoji` button click. */
              }}
              tooltip="Emoji"
              icon={faFaceSmile}
            />

            <IconButton
              onClick={() => {
                openFilePicker()
                if (filesContent.length <= 0) {
                  return
                }

                void sendImageMessageFromFile(
                  filesContent[0],
                  client,
                  activeRoomId
                )
              }}
              tooltip="Attach"
              icon={faPaperclip}
            />
          </div>

          <div className="flex w-full rounded-[5px] border-[1px] border-solid border-neutral-300 bg-neutral-50">
            <textarea
              onKeyDown={handleKeyDown}
              rows={1}
              ref={textareaRef}
              autoFocus
              placeholder="Write a message or simply say 👋🏼 hello..."
              value={value}
              disabled={false}
              onChange={value => {
                setValue(value.target.value)

                if (value.target.value === "") {
                  return
                }

                void sendEventTyping()
              }}
              className="flex max-h-[100px] w-full resize-none overflow-y-auto border-none bg-transparent p-3 scrollbar-hide focus-visible:outline-none focus-visible:outline-0"
            />

            <div className="m-[5px] size-max">
              <IconButton
                tooltip="Send"
                icon={faPaperPlane}
                color="#C463FF"
                isDisabled={false}
                onClick={() => {
                  void sendTextMessage(MsgType.Text, value)
                  setValue("")
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="size-6" />

          <div className="size-6" />

          {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 border-t-[1px] border-solid border-t-stone-200 bg-neutral-50 p-[5px]">
        <SmartAction
          icon={faStarOfLife}
          text="Quick menu"
          onClick={() => {
            /* TODO: Handle `Quick menu` click. */
          }}
        />

        <SmartAction
          icon={faUniversalAccess}
          text="Accessibility"
          onClick={() => {
            /* TODO: Handle `Accessibility` click. */
          }}
        />

        <SmartAction
          icon={faCircleHalfStroke}
          text="Switch theme"
          onClick={() => {
            /* TODO: Handle `Switch theme` click. */
          }}
        />

        <SmartAction
          icon={faEarthAmerica}
          text="63ms ping"
          onClick={() => {
            /* TODO: Handle `Ping` click. */
          }}
        />
      </div>
    </div>
  )
}

export default ChatContainer
