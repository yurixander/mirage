import {useEffect, useRef, useState, type FC} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import EmojiPicker, {putEmojiInPosition} from "@/components/EmojiPicker"
import TextArea from "@/components/TextArea"
import AttachSource from "./AttachSource"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import useTooltip from "@/hooks/util/useTooltip"
import useDebounced from "@/hooks/util/useDebounced"

export type MessageSendRequest = {
  roomId: string
  messageText: string
}

export type ChatInputProps = {
  roomId: string
  isInputDisabled: boolean
  onSendMessageText: (messageSendRequest: MessageSendRequest) => void
  onPickFile: (file: File) => void
  onSendTypingEvent: (roomId: string) => void
  className?: string
}

export type SelectionRange = {
  selectionStart: number | null
  selectionEnd: number | null
}

const INPUT_ACTION_CLASS = "size-5 md:size-6 text-slate-300"

const ChatInput: FC<ChatInputProps> = ({
  roomId,
  onSendMessageText,
  onPickFile,
  onSendTypingEvent,
  isInputDisabled,
  className,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [caretPosition, setCaretPosition] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const debouncedText = useDebounced(messageText, 500)

  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    selectionEnd: null,
    selectionStart: null,
  })

  useEffect(() => {
    if (debouncedText.length === 0 || isInputDisabled) {
      return
    }

    onSendTypingEvent(roomId)
  }, [debouncedText.length, isInputDisabled, onSendTypingEvent, roomId])

  useEffect(() => {
    if (textAreaRef.current === null) {
      return
    }

    const cachedTextAreaRef = textAreaRef.current

    const handleSendMessage = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.key === "Enter" && messageText.length > 0) {
        event.preventDefault()

        onSendMessageText({roomId, messageText})
        setMessageText("")
      }
    }

    cachedTextAreaRef.addEventListener("keydown", handleSendMessage)

    return () => {
      cachedTextAreaRef.removeEventListener("keydown", handleSendMessage)
    }
  }, [messageText, onSendMessageText, roomId])

  return (
    <div
      className={twMerge(
        "flex max-h-28 items-start gap-2 rounded-2xl border border-slate-300 bg-gray-50",
        "w-full md:max-h-36 md:gap-2.5 md:rounded-3xl md:px-3 md:py-2",
        className
      )}>
      <div className="flex h-max w-full items-start gap-1">
        <AttachSource isDisabled={isInputDisabled} onPickFile={onPickFile} />

        <TextArea
          ref={textAreaRef}
          className="max-h-24 w-full border-none p-0 text-sm disabled:cursor-default md:max-h-32 md:text-xl"
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

        <div className="ml-auto flex h-7 items-center gap-2">
          <EmojiPickerPopover
            isDisabled={isInputDisabled}
            onPickEmoji={emoji => {
              putEmojiInPosition(
                emoji,
                caretPosition,
                selectionRange,
                setMessageText
              )
            }}
          />

          <InputChatAction
            isDisabled={isInputDisabled}
            onClick={() => {
              // TODO: Handle capture audio.
            }}>
            <IoMic className={INPUT_ACTION_CLASS} />
          </InputChatAction>

          <InputChatAction
            isDisabled={messageText.length === 0 || isInputDisabled}
            onClick={() => {
              textAreaRef.current?.focus()

              onSendMessageText({roomId, messageText})
              setMessageText("")
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
  isDisabled?: boolean
}> = ({isDisabled, children, onClick}) => {
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  return (
    <Button
      ref={renderRef}
      variant="ghost"
      size="icon"
      className="size-max hover:bg-transparent"
      onClick={() => {
        try {
          onClick()
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showTooltip(error.message, true)
        }
      }}
      disabled={isDisabled}>
      {children}
    </Button>
  )
}

const EmojiPickerPopover: FC<{
  onPickEmoji: (emoji: string) => void
  isDisabled?: boolean
}> = ({onPickEmoji, isDisabled = false}) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)

  useEffect(() => {
    const handleOpenEmojiPicker = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.key === "e" && !isDisabled) {
        event.preventDefault()

        setIsEmojiPickerVisible(prevIsOpen => !prevIsOpen)
      }
    }

    document.addEventListener("keydown", handleOpenEmojiPicker)

    return () => {
      document.removeEventListener("keydown", handleOpenEmojiPicker)
    }
  }, [isDisabled])

  return (
    <Popover open={isEmojiPickerVisible} onOpenChange={setIsEmojiPickerVisible}>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          className={twMerge(
            isEmojiPickerVisible && "bg-accent text-accent-foreground",
            "size-max hover:bg-transparent"
          )}
          aria-label="Emoji picker"
          variant="ghost"
          size="icon"
          onKeyDown={event => {
            if (event.ctrlKey && event.key === "q") {
              setIsEmojiPickerVisible(true)
            }
          }}>
          <IoIosHappy
            aria-label="Smile icon"
            className={twMerge(
              INPUT_ACTION_CLASS,
              isEmojiPickerVisible && "text-slate-500"
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        alignOffset={-70}
        sideOffset={16}
        className="p-1.5">
        <EmojiPicker onPickEmoji={onPickEmoji} />
      </PopoverContent>
    </Popover>
  )
}

export default ChatInput
