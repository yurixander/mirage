import {assert} from "@/utils/util"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

type Properties = {
  className?: string
  text: string
}

const StatusMessage: FC<Properties> = ({className, text}) => {
  assert(text.length > 0, "Status message text should not be empty.")

  return (
    <div
      className={twMerge(
        "rounded-xl border border-statusMessageColor bg-statusMessageBg p-2 text-center text-red-500",
        className
      )}>
      {text}
    </div>
  )
}

export default StatusMessage
