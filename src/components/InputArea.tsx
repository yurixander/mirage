import {useEffect, useRef, useState, type FC} from "react"
import type React from "react"
import {twMerge} from "tailwind-merge"

export type InputAreaProps = {
  initialValue?: string
  initiallyRows?: number
  className?: string
  placeholder?: string
  onValueChange: (value: string) => void
}

const InputArea: FC<InputAreaProps> = ({
  onValueChange,
  initialValue,
  className,
  placeholder,
  initiallyRows = 1,
}) => {
  const [value, setValue] = useState(initialValue ?? "")
  const textareaReference = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter")
      if (event.ctrlKey) {
        onValueChange(value + "\n")
        setValue(value + "\n")
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
        rows={initiallyRows}
        ref={textareaReference}
        placeholder={placeholder}
        value={value}
        disabled={false}
        onChange={event => {
          const value = event.target.value

          setValue(value)
          onValueChange(value)
        }}
      />
    </div>
  )
}

export default InputArea
