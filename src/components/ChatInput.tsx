import {useEffect, useRef, useState} from "react"
import "../styles/ChatInput.sass"
import IconButton from "./IconButton"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"

export type ChatInputProps = {
  isDisabled?: boolean
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
      if (event.ctrlKey)
        setValue(value + "\n")
      else
        // TODO: Handle here send message with enter.
        event.preventDefault()
  }

  return (
    <div className={`InputContainer ${isDisabledClassName}`}>
      <textarea
        onKeyDown={handleKeyDown}
        // TODO: Need to add the `.disabled` class, not just the attribute. This will ensure consistency, such as showing the `not-allowed` cursor.
        className="input"
        rows={1}
        ref={textareaRef}
        autoFocus={true}
        placeholder={"Write a message or simply say 👋🏼 hello..."}
        value={value}
        onChange={(value) => setValue(value.target.value)}
        disabled={props.isDisabled}>
      </textarea>
      <div className="send">
        <IconButton
          onClick={() => {/* TODO: Handle click for send message. */}}
          tooltip={"Send"}
          tooltipPlacement={"auto"}
          icon={faPaperPlane}
          color="#C463FF"
          isDisabled={props.isDisabled} />
      </div>
    </div>
  )
}
