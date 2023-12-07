import {IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "../styles/SmartAction.sass"

export type SmartActionProps = {
  icon: IconProp
  text: string
  onClick: () => void
}

export default function SmartAction(props: SmartActionProps) {
  return (
    <div className="SmartAction" onClick={props.onClick}>
      <FontAwesomeIcon className="icon" icon={props.icon} />
      <span>{props.text}</span>
    </div>
  )
}
