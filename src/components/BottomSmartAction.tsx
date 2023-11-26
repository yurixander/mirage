import {IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../styles/BottomSmartAction.sass"

export type BottomSmartActionProps = {
  icon: IconProp
  text: string
  onClick: () => void
}

export default function BottomSmartAction(props: BottomSmartActionProps) {
  return (
    <div className="smart-action" onClick={props.onClick}>
      <FontAwesomeIcon className="icon" icon={props.icon} />
      <span>{props.text}</span>
    </div>
  )
}
