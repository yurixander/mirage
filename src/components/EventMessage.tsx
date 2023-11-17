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
      {/* FIXME: Icon needs to be adjusted to be vertically centered, now that `line-height` was added to the content. */}
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
