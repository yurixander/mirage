import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {Text} from "./ui/typography"

export type LoaderProps = {
  text: string
  className?: string
}

const Loader: FC<LoaderProps> = ({text, className}) => {
  return (
    <div
      className={twMerge(
        "flex size-full flex-col items-center justify-center gap-2",
        className
      )}>
      <div className="size-8 animate-rotation rounded-full border-4 border-white border-t-slate-500" />

      <Text align="center" className="max-w-max">
        {text}
      </Text>
    </div>
  )
}

export default Loader
