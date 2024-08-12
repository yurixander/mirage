import {assert} from "@/utils/util"
import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type LabelProps = {
  text: string
  className?: string
}

const Label: FC<LabelProps> = ({className, text}) => {
  assert(text.length > 0, "Label text should not be empty.")

  return (
    <div
      className={twMerge(
        "text-xs font-semibold uppercase text-gray-300",
        className
      )}>
      {text}
    </div>
  )
}

export default memo(Label)
