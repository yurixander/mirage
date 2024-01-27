import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"

export type SmartActionProps = {
  icon: IconProp
  text: string
  onClick: () => void
}

const SmartAction: FC<SmartActionProps> = ({icon, text, onClick}) => {
  return (
    <div className="flex cursor-pointer gap-5px text-small" onClick={onClick}>
      <FontAwesomeIcon className="size-10px text-contrastIcon" icon={icon} />

      <span>{text}</span>
    </div>
  )
}

export default SmartAction
