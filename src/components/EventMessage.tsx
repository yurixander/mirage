import {type FC} from "react"
import {formatTime} from "../utils/util"
import {IoMdCreate} from "react-icons/io"

export type EventSender = {
  displayName: string
  userId: string
}

export type EventMessagePropsCommon = {
  eventId: string
  sender: EventSender
  timestamp: number
}

export type EventMessageProps = {
  eventId: string
  sender: EventSender
  body: string
  timestamp: number
}

const EventMessage: FC<EventMessageProps> = ({timestamp, body, sender}) => {
  const localeTimeString = formatTime(timestamp)

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-10 items-center justify-end">
        <IoMdCreate className="text-neutral-200" />
      </div>

      <div className="max-w-messageMaxWidth select-text whitespace-pre-line break-words italic leading-160">
        {sender.displayName} {body}
      </div>

      <time className="ml-auto text-gray-300">{localeTimeString}</time>
    </div>
  )
}

export default EventMessage
