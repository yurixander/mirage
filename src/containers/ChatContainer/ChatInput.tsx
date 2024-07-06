import IconButton from "@/components/IconButton"
import {type FC} from "react"
import {IoIosHappy} from "react-icons/io"
import {IoAttach, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useChatInput from "./useChatInput"

export type ChatInputProps = {
  roomId: string
  className?: string
}

const ChatInput: FC<ChatInputProps> = ({roomId, className}) => {
  const {messageText, setMessageText, isDisabled, sendTextMessage} =
    useChatInput(roomId)

  return (
    <div className={twMerge("flex gap-2 px-4", className)}>
      <div className="flex h-full items-center gap-3">
        <IconButton
          tooltip="Emoji"
          Icon={IoIosHappy}
          isDisabled={isDisabled}
          onClick={() => {
            /* TODO: Handle `emoji` button click. */
          }}
        />

        <IconButton
          tooltip="Attach"
          Icon={IoAttach}
          isDisabled={isDisabled}
          onClick={() => {
            // TODO: Handle here onAttach function.
          }}
        />
      </div>

      <div className="flex w-full rounded-md border border-neutral-300 bg-neutral-50">
        <textarea
          className="flex w-full resize-none overflow-y-auto border-none bg-transparent p-3 scrollbar-hide focus-visible:outline-none focus-visible:outline-0"
          rows={1}
          placeholder="Write a message or simply say 👋🏼 hello..."
          value={messageText}
          disabled={isDisabled}
          onChange={value => {
            setMessageText(value.target.value)
          }}
          onKeyDown={event => {
            if (event.key === "Enter") {
              if (event.ctrlKey) {
                setMessageText(afterText => afterText + "\n")
              } else {
                event.preventDefault()
                void sendTextMessage(messageText)
              }
            }
          }}
        />

        <div className="m-1 size-max">
          <IconButton
            tooltip="Send"
            Icon={IoPaperPlane}
            color="#C463FF"
            isDisabled={isDisabled}
            onClick={() => {
              void sendTextMessage(messageText)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatInput
