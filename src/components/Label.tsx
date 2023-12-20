import {memo} from "react"
import "../styles/Label.sass"

export type LabelProps = {
  text: string
  className?: string
}

function Label(props: LabelProps) {
  return <div className={`Label ${props.className}`}>{props.text}</div>
}

export default memo(Label)
