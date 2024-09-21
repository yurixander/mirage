import {type FC} from "react"
import {type IconType} from "react-icons"

export type SmartActionProps = {
  Icon: IconType
  text: string
  onClick: () => void
}

const SmartAction: FC<SmartActionProps> = ({Icon, text, onClick}) => {
  return (
    <button
      className="flex cursor-pointer items-center gap-1 text-xs"
      onClick={onClick}>
      <Icon size={10} className="text-neutral-300" />
      <span>{text}</span>
    </button>
  )
}

export default SmartAction
