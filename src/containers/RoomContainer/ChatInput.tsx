import {useEffect, useRef, type FC} from "react"
import useChatInput from "./useChatInput"
import ImageModalPreview from "./ImageModalPreview"
import {IoIosHappy} from "react-icons/io"
import {IoAddCircle, IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import EmojiPicker from "@/components/EmojiPicker"
import useElementPoints from "@/hooks/util/useElementPoints"

export type ChatInputProps = {
  roomId: string
  className?: string
}

const BUTTON_SIZE_CLASS = "size-5 md:size-7"

const ChatInput: FC<ChatInputProps> = ({roomId, className}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const {clearPoints, points, setPointsByEvent} = useElementPoints()

  const {
    messageText,
    setMessageText,
    isDisabled,
    sendTextMessage,
    openFilePicker,
    imagePreviewProps,
  } = useChatInput(roomId)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [messageText])

  return (
    <>
      {imagePreviewProps !== undefined && (
        <ImageModalPreview {...imagePreviewProps} />
      )}

      {points !== null && (
        <EmojiPicker
          locationPoints={points}
          onPickEmoji={emoji => {
            setMessageText(prevText => prevText + emoji)
          }}
        />
      )}

      <div
        className={twMerge(
          "mx-2 my-1 flex max-h-28 gap-2 rounded-2xl border border-slate-300 bg-gray-50 px-3 py-2",
          "md:max-h-36 md:gap-3 md:rounded-3xl md:px-4 md:py-3",
          className
        )}>
        <IoAddCircle
          className={twMerge("text-slate-400", BUTTON_SIZE_CLASS)}
          role="button"
          onClick={openFilePicker}
        />

        <textarea
          className="max-h-24 w-full resize-none bg-transparent text-sm scrollbar-hide focus-visible:outline-none focus-visible:outline-0 md:max-h-32 md:text-xl"
          ref={textareaRef}
          placeholder="Write a message or simply say 👋🏼 hello..."
          value={messageText}
          rows={1}
          onChange={event => {
            setMessageText(event.target.value)
          }}
        />

        <IoIosHappy
          className={twMerge(
            BUTTON_SIZE_CLASS,
            points === null ? "text-slate-300" : "text-blue-500"
          )}
          role="button"
          onClick={event => {
            if (points !== null) {
              clearPoints()

              return
            }

            setPointsByEvent(event)
          }}
        />

        <IoMic
          className={twMerge("text-slate-300", BUTTON_SIZE_CLASS)}
          role="button"
          onClick={() => {
            // TODO: Handle capture audio.
          }}
        />

        <IoSend
          className={twMerge(
            "text-blue-500",
            BUTTON_SIZE_CLASS,
            isDisabled && "cursor-not-allowed opacity-50"
          )}
          role="button"
          onClick={() => {
            if (isDisabled) {
              return
            }

            void sendTextMessage(messageText)
          }}
        />
      </div>
    </>
  )
}

export default ChatInput
