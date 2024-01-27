import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import {useCallback, useEffect, useRef, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import "../styles/ChatInput.sass"
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

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter")
      if (event.ctrlKey) setValue(value + "\n")
      // TODO: Handle here send message with enter.
      else event.preventDefault()
  }, [])

  return (
    <div className="input-container">
      <textarea
        onKeyDown={handleKeyDown}
        className={twMerge("input", isDisabledClassName)}
        rows={1}
        ref={textareaRef}
        autoFocus={true}
        placeholder={"Write a message or simply say 👋🏼 hello..."}
        value={value}
        onChange={value => {
          setValue(value.target.value)
        }}
        disabled={isDisabled}></textarea>
      <div className="send">
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
