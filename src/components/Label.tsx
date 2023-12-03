import {memo} from "react"
import "../styles/Label.sass"

export type LabelProps = {
  text: string
}

function Label(props: LabelProps) {
  return <div className="Label">
    {props.text}
  </div>
}

export default memo(Label)
