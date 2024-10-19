import {type FC, memo} from "react"
import {twMerge} from "tailwind-merge"

export type LabelProps = {
  text: string
  className?: string
}

const Label: FC<LabelProps> = ({className, text}) => {
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
