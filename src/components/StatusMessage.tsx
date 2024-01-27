import {type FC} from "react"

type Props = {
  className?: string
  text: string
}

const StatusMessage: FC<Props> = ({className, text}) => {
  return (
    <div className="rounded-10 border-1 border-solid border-statusMessageColor bg-statusMessageBg p-2 text-center text-red">
      {text}
    </div>
  )
}

export default StatusMessage
