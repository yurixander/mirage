import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type LoaderProps = {
  text?: string
}

const Loader: FC<LoaderProps> = ({text}) => {
  const loaderContainerTwClassName = "flex justify-center items-center"
  const loaderTwClassName = twMerge(
    "h-loaderSize w-loaderSize",
    " rounded-50 border-3 border-solid border-white",
    "border-t-transparent border-b-transparent",
    "text-center self-center origin-center",
    "transition-opacity duration-300 ease-in animate-spin"
  )

  return (
    <div className={loaderContainerTwClassName}>
      <div className={loaderTwClassName}></div>
      {text && <span className="ml-1ch">{text}</span>}
    </div>
  )
}

export default Loader
