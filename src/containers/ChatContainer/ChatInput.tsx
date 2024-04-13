import IconButton from "@/components/IconButton"
import {type FC, useRef, useEffect} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoAttach, IoPaperPlane} from "react-icons/io5"
import React from "react"

export type ChatInputProps = {
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

export default ChatInput
