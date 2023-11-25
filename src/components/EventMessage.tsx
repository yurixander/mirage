import "../styles/EventMessage.sass"
import {ReactComponent as PencilIcon} from "../../public/icons/pencil.svg"
import {timeFormatter} from "../util"

export type EventMessageProps = {
  content: JSX.Element
  timestamp: number
}

export default function EventMessage(props: EventMessageProps) {
  const localeTimeString = timeFormatter(props.timestamp)

  return (
    <div className="EventMessage">
      <PencilIcon />
      <div className="content">
        {props.content}
      </div>
      <div className="time">
        {localeTimeString}
      </div>
    </div>
  )
}
