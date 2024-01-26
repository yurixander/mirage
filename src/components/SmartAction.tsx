import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "../styles/SmartAction.sass"
import {type FC} from "react"

export type SmartActionProps = {
  icon: IconProp
  text: string
  onClick: () => void
}

const SmartAction: FC<SmartActionProps> = ({icon, text, onClick}) => {
  return (
    <div className="SmartAction" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={icon} />

      <span>{text}</span>
    </div>
  )
}

export default SmartAction
