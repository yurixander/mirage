import {useState, type FC} from "react"
import useChatInput from "./useChatInput"
import {IoIosHappy} from "react-icons/io"
import {IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import EmojiPicker from "@/components/EmojiPicker"
import useElementPoints from "@/hooks/util/useElementPoints"
import TextArea from "@/components/TextArea"
import AttachSource from "./AttachSource"

export type ChatInputProps = {
  roomId: string
  className?: string
}

type SelectionRange = {
  selectionStart: number | null
  selectionEnd: number | null
}

const BUTTON_SIZE_CLASS = "size-5 md:size-7"

const ChatInput: FC<ChatInputProps> = ({roomId, className}) => {
  const {clearPoints, points, setPointsByEvent} = useElementPoints()
  const [caretPosition, setCaretPosition] = useState<number | null>(null)

  const [{selectionStart, selectionEnd}, setSelectionRange] =
    useState<SelectionRange>({
      selectionEnd: null,
      selectionStart: null,
    })

  const {
    messageText,
    setMessageText,
    isDisabled,
    isInputDisabled,
    sendTextMessage,
  } = useChatInput(roomId)

  return (
    <>
      {points !== null && (
        <EmojiPicker
          locationPoints={points}
          onPickEmoji={emoji => {
            if (
              selectionStart !== null &&
              selectionEnd !== null &&
              selectionEnd !== selectionStart
            ) {
              try {
                setMessageText(prevText => {
                  if (
                    selectionStart === 1 &&
                    selectionEnd === prevText.length
                  ) {
                    return emoji
                  }

                  return prevText
                    .slice(0, selectionStart)
                    .concat(emoji)
                    .concat(prevText.slice(selectionEnd, prevText.length))
                })

                return
              } catch (error) {
                console.error("Error updating text", error)
              }
            }

            if (caretPosition === null || caretPosition >= messageText.length) {
              setMessageText(prevText => prevText + emoji)

              return
            }

            setMessageText(prevText =>
              prevText
                .slice(0, caretPosition)
                .concat(emoji)
                .concat(prevText.slice(caretPosition, prevText.length))
            )
          }}
        />
      )}

      <div
        className={twMerge(
          "mx-2 my-1 flex max-h-28 gap-2 rounded-2xl border border-slate-300 bg-gray-50",
          "md:max-h-36 md:gap-3 md:rounded-3xl md:px-4 md:py-3",
          className
        )}>
        <AttachSource
          onPickFile={file => {
            throw new Error("Attach file not implemented.")
          }}
        />

        <TextArea
          className="max-h-24 w-full border-none p-0 text-sm md:max-h-32 md:text-xl"
          value={messageText}
          onValueChanged={setMessageText}
          disabled={isInputDisabled}
          placeholder="Write a message or simply say 👋🏼 hello..."
          onSelect={event => {
            if (!(event.target instanceof HTMLTextAreaElement)) {
              return
            }

            setCaretPosition(event.target.selectionStart ?? 0)

            setSelectionRange({
              selectionEnd: event.target.selectionEnd,
              selectionStart: event.target.selectionStart,
            })
          }}
        />

        <IoIosHappy
          role="button"
          className={twMerge(
            BUTTON_SIZE_CLASS,
            points === null ? "text-slate-300" : "text-blue-500",
            isInputDisabled && "cursor-not-allowed opacity-75"
          )}
          onClick={event => {
            if (points !== null || isInputDisabled) {
              clearPoints()

              return
            }

            setPointsByEvent(event)
          }}
        />

        <IoMic
          role="button"
          className={twMerge(
            "text-slate-300",
            isInputDisabled && "cursor-not-allowed opacity-75",
            BUTTON_SIZE_CLASS
          )}
          onClick={() => {
            if (isInputDisabled) {
              // TODO: return
            }

            // TODO: Handle capture audio.
          }}
        />

        <IoSend
          role="button"
          className={twMerge(
            "text-blue-500",
            isDisabled && "cursor-not-allowed opacity-50",
            BUTTON_SIZE_CLASS
          )}
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
