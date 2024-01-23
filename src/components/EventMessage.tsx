import "../styles/EventMessage.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencil} from "@fortawesome/free-solid-svg-icons"
import {timeFormatter} from "../util"

export type EventMessageProps = {
  content: JSX.Element
  timestamp: number
}

export default function EventMessage(props: EventMessageProps) {
  const localeTimeString = timeFormatter(props.timestamp)

  return (
    <div className="EventMessage">
      <div className="pencil-container">
        <FontAwesomeIcon icon={faPencil} className="pencil-icon" />
      </div>

      <div className="content">{props.content}</div>

      <time className="time">{localeTimeString}</time>
    </div>
  )
}
