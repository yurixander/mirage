import {type FC} from "react"
import Typography from "./Typography"
import {twMerge} from "tailwind-merge"
import {assert} from "@/utils/util"

export type LoaderProps = {
  text: string
  className?: string
}

const Loader: FC<LoaderProps> = ({text, className}) => {
  assert(text.length > 0, "Loader text should not be empty.")

  return (
    <div
      className={twMerge(
        "flex size-full flex-col items-center justify-center gap-2",
        className
      )}>
      <div className="size-8 animate-rotation rounded-full border-4 border-white border-t-slate-500" />

      <Typography>{text}</Typography>
    </div>
  )
}

export default Loader
