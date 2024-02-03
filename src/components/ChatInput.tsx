/* eslint-disable tailwindcss/enforces-shorthand */
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import {useEffect, useRef, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import IconButton from "./IconButton"

export type ChatInputProps = {
  isDisabled?: boolean
  isReplyMode?: boolean
}

const ChatInput: FC<ChatInputProps> = ({isDisabled, isReplyMode}) => {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
      else event.preventDefault()
  }

  return (
    <div className="flex w-full rounded-[5px] border-[1px] border-solid border-neutral-300 bg-neutral-50">
      <textarea
        onKeyDown={handleKeyDown}
        rows={1}
        ref={textareaRef}
        autoFocus
        placeholder="Write a message or simply say 👋🏼 hello..."
        value={value}
        disabled={isDisabled}
        onChange={value => {
          setValue(value.target.value)
        }}
        className={twMerge(
          "flex max-h-[100px] w-full p-3 resize-none border-none bg-transparent overflow-y-auto scrollbar-hide focus-visible:outline-none "
        )}
      />
      <div className="m-[5px] h-max w-max">
        <IconButton
          tooltip="Send"
          icon={faPaperPlane}
          color="#C463FF"
          isDisabled={isDisabled}
          onClick={() => {
            /* TODO: Handle click for send message. */
          }}
        />
      </div>
    </div>
  )
}

export default ChatInput
