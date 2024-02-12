import {faPencil} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"
import {timeFormatter} from "../utils/util"

export type EventMessageProps = {
  content?: JSX.Element
  timestamp: number
  text: string
}

const EventMessage: FC<EventMessageProps> = ({content, timestamp, text}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-[40px] items-center justify-end">
        <FontAwesomeIcon icon={faPencil} className="text-neutral-200" />
      </div>

      <div className="select-text italic leading-[160%]">{text}</div>

      <time className="ml-auto text-gray-300">{localeTimeString}</time>
    </div>
  )
}

export default EventMessage
