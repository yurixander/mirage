import {type FC} from "react"
import {twMerge} from "tailwind-merge"

type Props = {
  className?: string
  text: string
}

const StatusMessage: FC<Props> = ({className, text}) => {
  return (
    <div
      className={twMerge(
        "rounded-xl border-[1px] border-solid border-statusMessageColor bg-statusMessageBg p-2 text-center text-red-500",
        className
      )}>
      {text}
    </div>
  )
}

export default StatusMessage
