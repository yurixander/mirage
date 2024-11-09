import {useEffect, useRef, useState, type FC} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoAddCircle, IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import EmojiPicker from "@/components/EmojiPicker"
import TextArea from "@/components/TextArea"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {IconButton} from "@/components/ui/button"
import useDebounced from "@/hooks/util/useDebounced"
import AudioRecorder, {AudioRecorderState} from "./AudioRecorder"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {putEmojiInPosition} from "@/hooks/util/useEmojiPicker"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"

export type MessageSendRequest = {
  roomId: string
  messageText: string
}

export type ChatInputProps = {
  roomId: string
  isInputDisabled: boolean
  onSendMessageText: (messageSendRequest: MessageSendRequest) => void
  onSendAudio: (audioBlob: Blob) => Promise<void>
  onPickFile: () => void
  onSendTypingEvent: (roomId: string) => void
  className?: string
}

export type SelectionRange = {
  selectionStart: number | null
  selectionEnd: number | null
}

const INPUT_ACTION_CLASS = "size-6 text-neutral-400 dark:text-neutral-500"

const ChatInput: FC<ChatInputProps> = ({
  roomId,
  onSendMessageText,
  onSendAudio,
  onPickFile,
  onSendTypingEvent,
  isInputDisabled,
  className,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [caretPosition, setCaretPosition] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const debouncedText = useDebounced(messageText, 500)
  const [recorderState, setRecorderState] = useState(AudioRecorderState.Idle)
  const {t} = useTranslation()

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
      if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault()

        setMessageText(prevText => prevText + "\n")

        return
      }

      if (event.key === "Enter" && messageText.length > 0) {
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
        "flex items-start border border-neutral-300 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900",
        "max-h-36 w-full gap-2.5 rounded-3xl px-3 py-2",
        className
      )}>
      {recorderState === AudioRecorderState.Idle ? (
        <div className="flex h-max w-full items-start gap-1">
          <IconButton
            tabIndex={0}
            aria-label={t(LangKey.AttachSource)}
            tooltip={t(LangKey.AttachSource)}
            disabled={isInputDisabled}
            onClick={onPickFile}
            className="size-max bg-transparent dark:bg-transparent">
            <IoAddCircle
              aria-hidden
              className={twMerge(
                "size-7 fill-neutral-400 dark:fill-neutral-500",
                className
              )}
            />
          </IconButton>

          <TextArea
            ref={textAreaRef}
            className="max-h-32 w-full border-none p-0 text-lg text-foreground disabled:cursor-default"
            value={messageText}
            onValueChanged={setMessageText}
            disabled={isInputDisabled}
            placeholder={t(LangKey.ChatInputPlaceholder)}
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

          <div className="ml-auto flex h-7 items-center">
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

            {messageText.length === 0 && (
              <IconButton
                aria-label={t(LangKey.RecordAudio)}
                tooltip={t(LangKey.RecordAudio)}
                disabled={isInputDisabled}
                asBoundary={false}
                onClick={() => {
                  setRecorderState(AudioRecorderState.Recording)
                }}>
                <IoMic aria-hidden className={INPUT_ACTION_CLASS} />
              </IconButton>
            )}

            <IconButton
              aria-label={t(LangKey.SendTextMessage)}
              tooltip={t(LangKey.SendTextMessage)}
              disabled={messageText.length === 0 || isInputDisabled}
              asBoundary={false}
              onClick={() => {
                textAreaRef.current?.focus()

                onSendMessageText({roomId, messageText})
                setMessageText("")
              }}>
              <IoSend
                aria-hidden
                className="size-5 text-blue-500 md:size-[22px]"
              />
            </IconButton>
          </div>
        </div>
      ) : (
        <AudioRecorder
          className="w-full justify-end"
          recorderState={recorderState}
          onStateChange={setRecorderState}
          onSendAudioMessage={onSendAudio}
        />
      )}
    </div>
  )
}

export const EmojiPickerPopover: FC<{
  onPickEmoji: (emoji: string) => void
  isDisabled?: boolean
}> = ({onPickEmoji, isDisabled = false}) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)
  const {t} = useTranslation()

  useGlobalHotkey({ctrl: true, key: "e"}, () => {
    if (isDisabled) {
      return
    }

    setIsEmojiPickerVisible(prevIsOpen => !prevIsOpen)
  })

  return (
    <Popover open={isEmojiPickerVisible} onOpenChange={setIsEmojiPickerVisible}>
      <PopoverTrigger asChild>
        <IconButton
          tabIndex={0}
          disabled={isDisabled}
          tooltip={t(LangKey.EmojiPicker)}
          aria-label={t(LangKey.EmojiPicker)}
          asBoundary={false}>
          <IoIosHappy aria-hidden className={INPUT_ACTION_CLASS} />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        alignOffset={-70}
        sideOffset={16}
        className="w-80 p-0 dark:bg-neutral-900">
        <EmojiPicker onPickEmoji={onPickEmoji} />
      </PopoverContent>
    </Popover>
  )
}

export default ChatInput
