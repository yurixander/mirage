import {useEffect, useRef, useState} from "react"
import "../styles/ChatInput.sass"
import IconButton from "./IconButton"
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

export default function ChatInput() {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (event.ctrlKey)
        setValue(value + '\n')
      else
        event.preventDefault() /* TODO: Handle here send message with enter. */
    }
  }

  return (
    <>
      <div className="InputContainer">
        <textarea
          onKeyDown={handleKeyDown}
          className="input"
          rows={1}
          ref={textareaRef}
          autoFocus={true}
          placeholder={"Write a message or simply say 👋🏼 hello..."}
          value={value}
          onChange={(value) => setValue(value.target.value)}
        ></textarea>
        <div className="send">
          <IconButton
            onClick={() => {/* TODO: Handle click for send message. */}}
            tooltip={"Send message"}
            tooltipPlacement={"auto"}
            icon={faPaperPlane}
            color="#C463FF" />
        </div>
      </div>
    </>
  )
}
