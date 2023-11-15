import "../styles/EventMessage.sass"
import {ReactComponent as PencilIcon} from "../../public/icons/pencil.svg"

export type EventMessageProps = {
  content: JSX.Element
  timestamp: number
}

export default function EventMessage(props: EventMessageProps) {
  const time = new Date(props.timestamp)
  const localeTimeString = time.toLocaleTimeString()

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
