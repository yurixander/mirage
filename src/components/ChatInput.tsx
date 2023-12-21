import {useEffect, useRef, useState} from "react"
import "../styles/ChatInput.sass"
import IconButton from "./IconButton"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"

export type ChatInputProps = {
  isDisabled?: boolean
  isReplyMode?: boolean
}

export default function ChatInput(props: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isDisabledClassName = props.isDisabled ? "disabled" : ""

  useEffect(() => {
    const textarea = textareaRef.current

    if (textarea) {
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
    <div className="input-container">
      <textarea
        onKeyDown={handleKeyDown}
        className={`input ${isDisabledClassName}`}
        rows={1}
        ref={textareaRef}
        autoFocus={true}
        placeholder={"Write a message or simply say 👋🏼 hello..."}
        value={value}
        onChange={value => {
          setValue(value.target.value)
        }}
        disabled={props.isDisabled}></textarea>
      <div className="send">
        <IconButton
          onClick={() => {
            /* TODO: Handle click for send message. */
          }}
          tooltip={"Send"}
          tooltipPlacement={"auto"}
          icon={faPaperPlane}
          color="#C463FF"
          isDisabled={props.isDisabled}
        />
      </div>
    </div>
  )
}
