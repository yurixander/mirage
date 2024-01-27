import {type FC} from "react"
import {twMerge} from "tailwind-merge"

type Props = {
  className?: string
  text: string
}

const StatusMessage: FC<Props> = ({className, text}) => {
  const twClassName = twMerge(
    "p-2 bg-statusMessageBg text-red text-center",
    "border-1 border-solid border-statusMessageColor rounded-10"
  )
  return <div className={twClassName + className}>{text}</div>
}

export default StatusMessage
