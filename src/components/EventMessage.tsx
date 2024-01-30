import {faPencil} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"
import {timeFormatter} from "../utils/util"

export type EventMessageProps = {
  content: JSX.Element
  timestamp: number
}

const EventMessage: FC<EventMessageProps> = ({content, timestamp}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div className="flex items-center gap-10px">
      <div className="flex w-avatarSize items-center justify-end">
        <FontAwesomeIcon icon={faPencil} className="text-neutral-200" />
      </div>

      <div className="select-text italic leading-160">{content}</div>

      <time className="ml-auto text-gray-300">{localeTimeString}</time>
    </div>
  )
}

export default EventMessage
