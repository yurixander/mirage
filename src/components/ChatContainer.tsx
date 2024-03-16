import {useCallback, useEffect, useMemo, useRef, useState, type FC} from "react"
import {assert, sendImageMessageFromFile} from "../utils/util"
import IconButton from "./IconButton"
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"
import useActiveRoom, {MessageKind} from "@/hooks/matrix/useActiveRoom"
import ImageMessage from "./ImageMessage"
import TextMessage from "./TextMessage"
import EventMessage from "./EventMessage"
import {twMerge} from "tailwind-merge"
import {useFilePicker} from "use-file-picker"
import {MsgType} from "matrix-js-sdk"
import {createPortal} from "react-dom"
import Button, {ButtonVariant} from "./Button"
import UnreadIndicator from "./UnreadIndicator"
import {
  IoEllipsisVertical,
  IoInformationCircle,
  IoAccessibility,
  IoContrast,
  IoAttach,
  IoPaperPlane,
} from "react-icons/io5"
import {IoMdGlobe, IoMdMedical, IoIosHappy, IoMdLink} from "react-icons/io"
import {LiaSlackHash} from "react-icons/lia"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const [value, setValue] = useState("")
  const textareaReference = useRef<HTMLTextAreaElement>(null)

  const {
    activeRoom,
    messages: messageProperties,
    typingUsers,
    client,
    activeRoomId,
    sendTextMessage,
    sendEventTyping,
  } = useActiveRoom()

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  const sendImageMessage = useCallback(async () => {
    await sendImageMessageFromFile(filesContent[0], client, activeRoomId)
    clear()
  }, [activeRoomId, clear, client, filesContent])

  const messages = useMemo(
    () =>
      messageProperties.map(message =>
        message.kind === MessageKind.Text ? (
          <TextMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Image ? (
          <ImageMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Event ? (
          <EventMessage key={message.data.id} {...message.data} />
        ) : (
          <UnreadIndicator key={"unread-indicator"} {...message.data} />
        )
      ),
    [messageProperties]
  )

  useEffect(() => {
    // Move scroll to last message.
    const textarea = textareaReference.current

    if (textarea !== null) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter")
      if (event.ctrlKey) {
        setValue(value + "\n")
      } else {
        event.preventDefault()
        void sendTextMessage(MsgType.Text, value)
        setValue("")
      }
  }

  const name = activeRoom?.name ?? " "

  assert(name.length > 0, "room name should not be empty")

  return (
    <>
      {filesContent.length > 0 &&
        createPortal(
          <div className="fixed inset-0 flex size-full w-screen flex-col items-center justify-center">
            <div className="flex max-h-[600px] max-w-[600px] flex-col gap-4 rounded-xl bg-slate-50 p-6 px-8 shadow-md">
              <img
                className="h-auto w-full rounded-lg object-cover shadow-md"
                src={filesContent[0].content}
                alt={filesContent[0].name}
              />
              <div className="flex w-full items-center justify-end gap-1">
                <Button
                  variant={ButtonVariant.Secondary}
                  onClick={() => {
                    clear()
                  }}
                  label={"Cancel"}
                />
                <Button
                  onClick={() => {
                    void sendImageMessage()
                  }}
                  label={"Send Image"}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      <div
        className={twMerge(
          "flex h-screen flex-col gap-4 border-[1px] border-solid border-stone-200",
          className
        )}>
        <header className="flex items-center gap-2 border-b border-solid border-b-stone-200 p-4">
          <div className="flex w-full gap-1">
            <LiaSlackHash className="text-purple-500" />

            <span className="text-purple-500">{name}</span>

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
          <div className="flex gap-3">
            <div className="mt-[5px] flex h-max gap-3 ">
              <IconButton
                onClick={() => {
                  /* TODO: Handle `emoji` button click. */
                }}
                tooltip="Emoji"
                Icon={IoIosHappy}
              />

              <IconButton
                onClick={() => {
                  openFilePicker()
                }}
                tooltip="Attach"
                Icon={IoAttach}
              />
            </div>

            <div className="flex w-full rounded-[5px] border-[1px] border-solid border-neutral-300 bg-neutral-50">
              <textarea
                onKeyDown={handleKeyDown}
                rows={1}
                ref={textareaReference}
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
                  Icon={IoPaperPlane}
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

        <div className="flex items-center justify-end gap-4 border-t border-solid border-t-stone-200 bg-neutral-50 p-[5px] pr-2">
          <SmartAction
            Icon={IoMdMedical}
            text="Quick menu"
            onClick={() => {
              /* TODO: Handle `Quick menu` click. */
            }}
          />

          <SmartAction
            Icon={IoAccessibility}
            text="Accessibility"
            onClick={() => {
              /* TODO: Handle `Accessibility` click. */
            }}
          />

          <SmartAction
            Icon={IoContrast}
            text="Switch theme"
            onClick={() => {
              /* TODO: Handle `Switch theme` click. */
            }}
          />

          <SmartAction
            Icon={IoMdGlobe}
            text="63ms ping"
            onClick={() => {
              /* TODO: Handle `Ping` click. */
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ChatContainer
