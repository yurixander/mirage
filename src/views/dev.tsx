import {useEffect, useRef, useState, type FC} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoAddCircle, IoMic, IoSend} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

const DevelopmentPreview: FC = () => {
  const [value, onValueChange] = useState("")

  return (
    <div>
      <ChatInputLocal value={value} onValueChange={onValueChange} />

      <p>{value}</p>
    </div>
  )
}

type ChatInputLocalProps = {
  value: string
  onValueChange: (value: string) => void
}

const ChatInputLocal: FC<ChatInputLocalProps> = ({value, onValueChange}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const BUTTON_SIZE = "size-5 md:size-7"

  return (
    // TODO: Remove m-4 testing
    <div
      className={twMerge(
        "m-4 flex max-h-28 gap-2 rounded-2xl border border-slate-300 bg-gray-50 px-3 py-2",
        "md:max-h-36 md:gap-3 md:rounded-3xl md:px-4 md:py-3"
      )}>
      <IoAddCircle
        className={twMerge("text-slate-400", BUTTON_SIZE)}
        role="button"
      />

      <textarea
        className={twMerge(
          "max-h-24 w-full resize-none bg-transparent text-sm scrollbar-hide focus-visible:outline-none focus-visible:outline-0",
          "md:max-h-32 md:text-xl"
        )}
        ref={textareaRef}
        placeholder="Write a message or simply say 👋🏼 hello..."
        value={value}
        rows={1}
        onChange={event => {
          onValueChange(event.target.value)
        }}
      />

      <IoIosHappy
        className={twMerge("text-slate-300", BUTTON_SIZE)}
        role="button"
      />

      <IoMic className={twMerge("text-slate-300", BUTTON_SIZE)} role="button" />

      <IoSend className={twMerge("text-blue-500", BUTTON_SIZE)} role="button" />
    </div>
  )
}

export default DevelopmentPreview
