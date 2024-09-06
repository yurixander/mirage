import {useRef, useState, type FC} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import EmojiPicker from "@/components/EmojiPicker"
import TextArea from "@/components/TextArea"
import AttachSource from "./AttachSource"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"

export type ChatInputProps = {
  roomId: string
  isInputDisabled: boolean
  className?: string
}

type SelectionRange = {
  selectionStart: number | null
  selectionEnd: number | null
}

const INPUT_ACTION_CLASS = "size-5 md:size-6 text-slate-300"

const ChatInput: FC<ChatInputProps> = ({
  roomId,
  isInputDisabled,
  className,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [caretPosition, setCaretPosition] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")

  const [{selectionStart, selectionEnd}, setSelectionRange] =
    useState<SelectionRange>({
      selectionEnd: null,
      selectionStart: null,
    })

  return (
    <div
      className={twMerge(
        "bg-red mx-2 my-1 flex max-h-28 items-start gap-2 rounded-2xl border border-slate-300 bg-gray-50",
        "w-full md:max-h-36 md:gap-2.5 md:rounded-3xl md:px-3 md:py-2",
        className
      )}>
      <div className="flex h-max w-full items-start gap-1">
        <AttachSource
          onPickFile={file => {
            throw new Error("Attach file not implemented.")
          }}
        />

        <TextArea
          ref={textAreaRef}
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

        <div className="ml-auto flex h-7 items-center gap-1.5">
          <EmojiPickerPopover
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

              if (
                caretPosition === null ||
                caretPosition >= messageText.length
              ) {
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

          <InputChatAction
            onClick={() => {
              if (isInputDisabled) {
                // TODO: return
              }

              // TODO: Handle capture audio.
            }}>
            <IoMic className={INPUT_ACTION_CLASS} />
          </InputChatAction>

          <InputChatAction
            onClick={() => {
              textAreaRef.current?.focus()
            }}>
            <IoSend className="size-5 text-blue-500 md:size-[22px]" />
          </InputChatAction>
        </div>
      </div>
    </div>
  )
}

const InputChatAction: FC<{
  onClick: () => void
  children: React.JSX.Element
}> = ({children, onClick}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-max hover:bg-transparent"
      onClick={onClick}>
      {children}
    </Button>
  )
}

const EmojiPickerPopover: FC<{
  onPickEmoji: (emoji: string) => void
}> = ({onPickEmoji}) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)

  return (
    <Popover open={isEmojiPickerVisible} onOpenChange={setIsEmojiPickerVisible}>
      <PopoverTrigger asChild>
        <Button
          className={twMerge(
            isEmojiPickerVisible && "bg-accent text-accent-foreground",
            "size-max hover:bg-transparent"
          )}
          aria-label="Emoji picker"
          variant="ghost"
          size="icon">
          <IoIosHappy
            aria-label="Smile icon"
            className={twMerge(
              INPUT_ACTION_CLASS,
              isEmojiPickerVisible && "text-slate-500"
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" className="p-1.5">
        <EmojiPicker onPickEmoji={onPickEmoji} />
      </PopoverContent>
    </Popover>
  )
}

export default ChatInput
