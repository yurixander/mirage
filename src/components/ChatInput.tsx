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
  const isDisabledClassName = isDisabled ? "disabled" : ""

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
    <div className="flex w-full rounded-5 border-1 border-solid border-border bg-contrast focus-visible:outline-2 focus-visible:outline-outlineTab">
      <textarea
        onKeyDown={handleKeyDown}
        className={twMerge(
          "flex max-h-100px w-full p-10px resize-none border-none bg-transparent overflow-y-auto scrollbar-hide focus-visible:outline-none ",
          isDisabledClassName
        )}
        rows={1}
        ref={textareaRef}
        autoFocus={true}
        placeholder={"Write a message or simply say 👋🏼 hello..."}
        value={value}
        onChange={value => {
          setValue(value.target.value)
        }}
        disabled={isDisabled}></textarea>
      <div className="m-5px h-max w-max">
        <IconButton
          onClick={() => {
            /* TODO: Handle click for send message. */
          }}
          tooltip={"Send"}
          tooltipPlacement={"auto"}
          icon={faPaperPlane}
          color="#C463FF"
          isDisabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default ChatInput
