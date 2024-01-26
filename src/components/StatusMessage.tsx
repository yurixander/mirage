import {type FC} from "react"
import "../styles/StatusMessage.sass"

type Props = {
  className?: string
  text: string
}

const StatusMessage: FC<Props> = ({className, text}) => {
  return <div className={"StatusMessage " + className}>{text}</div>
}

export default StatusMessage
