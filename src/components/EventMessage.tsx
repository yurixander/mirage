import "../styles/EventMessage.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencil} from "@fortawesome/free-solid-svg-icons"
import {timeFormatter} from "../util"
import {type FC} from "react"

export type EventMessageProps = {
  content: JSX.Element
  timestamp: number
}

const EventMessage: FC<EventMessageProps> = ({content, timestamp}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div className="EventMessage">
      <div className="pencil-container">
        <FontAwesomeIcon icon={faPencil} className="pencil-icon" />
      </div>
      <div className="content">{content}</div>
      <time className="time">{localeTimeString}</time>
    </div>
  )
}

export default EventMessage
