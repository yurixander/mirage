import {type FC} from "react"

export type LoaderProps = {
  text?: string
}

const Loader: FC<LoaderProps> = ({text}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="size-loaderSize origin-center animate-spin self-center rounded-50 border-3 border-solid border-white border-y-transparent text-center transition-opacity duration-300 ease-in" />

      {text && <span className="ml-1ch">{text}</span>}
    </div>
  )
}

export default Loader
