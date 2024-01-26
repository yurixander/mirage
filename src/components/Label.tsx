import {type FC, memo} from "react"
import "../styles/Label.sass"

export type LabelProps = {
  text: string
  className?: string
}
const Label: FC<LabelProps> = ({className, text}) => {
  return <div className={`Label ${className}`}>{text}</div>
}

export default memo(Label)
