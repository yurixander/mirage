import {type FC} from "react"
import {timeFormatter} from "../utils/util"
import {IoMdCreate} from "react-icons/io"

export type EventMessageProps = {
  timestamp: number
  text: string
  id: string
}

const EventMessage: FC<EventMessageProps> = ({timestamp, text}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-10 items-center justify-end">
        <IoMdCreate className="text-neutral-200" />
      </div>

      <div className="max-w-messageMaxWidth select-text whitespace-pre-line break-words italic leading-160">
        {text}
      </div>

      <time className="ml-auto text-gray-300">{localeTimeString}</time>
    </div>
  )
}

export default EventMessage
