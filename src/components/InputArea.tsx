import {useEffect, useRef, type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"

export type InputAreaProps = {
  value: string
  rows?: number
  className?: string
  placeholder?: string
  onValueChange: (value: string) => void
}

const InputArea: FC<InputAreaProps> = ({
  onValueChange,
  value,
  className,
  placeholder,
  rows = 1,
}) => {
  const textareaReference = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter")
      if (event.ctrlKey) {
        onValueChange(value + "\n")
      } else {
        event.preventDefault()
      }
  }

  // Move scroll to last message.
  useEffect(() => {
    const textarea = textareaReference.current

    if (textarea !== null) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <div
      className={twMerge(
        "flex w-full rounded-md border border-neutral-300 bg-neutral-50",
        className
      )}>
      <textarea
        className="flex max-h-24 w-full resize-none overflow-y-auto border-none bg-transparent p-3 scrollbar-hide focus-visible:outline-none focus-visible:outline-0"
        onKeyDown={handleKeyDown}
        rows={rows}
        ref={textareaReference}
        placeholder={placeholder}
        value={value}
        disabled={false}
        onChange={value => {
          onValueChange(value.target.value)
        }}
      />
    </div>
  )
}

export default InputArea
