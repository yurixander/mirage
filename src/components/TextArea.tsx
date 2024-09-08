import React, {useEffect, useState} from "react"
import {twMerge} from "tailwind-merge"

export type TextAreaProps = {
  value: string
  onValueChanged: (value: string) => void
  disabled?: boolean
  maxRows?: number
  placeholder?: string
  className?: string
  onSelect?: (event: React.SyntheticEvent<HTMLTextAreaElement, Event>) => void
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      onValueChanged,
      disabled = false,
      maxRows = 4,
      placeholder,
      onSelect,
      className,
    },
    ref
  ) => {
    const [rows, setRows] = useState(1)

    useEffect(() => {
      const lineCount = value.split("\n").length

      setRows(Math.min(lineCount, maxRows))
    }, [maxRows, value])

    return (
      <textarea
        ref={ref}
        className={twMerge(
          "h-max resize-none rounded-md border border-slate-300 bg-transparent p-2 outline-0 scrollbar-hide focus:outline-0 focus-visible:outline-0 active:outline-0",
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onSelect={onSelect}
        onChange={e => {
          onValueChanged(e.target.value)
        }}
      />
    )
  }
)

export default TextArea
