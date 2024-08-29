import {type FC, useState} from "react"
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

const TextArea: FC<TextAreaProps> = ({
  value,
  onValueChanged,
  disabled = false,
  maxRows = 4,
  placeholder,
  onSelect,
  className,
}) => {
  const [rows, setRows] = useState(1)

  return (
    <textarea
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
        const currentValue = e.target.value

        const lineCount = currentValue.split("\n").length

        setRows(Math.min(lineCount, maxRows))
        onValueChanged(currentValue)
      }}
    />
  )
}

export default TextArea
