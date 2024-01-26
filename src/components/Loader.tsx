import {type FC} from "react"
import "../styles/Loader.sass"

export type LoaderProps = {
  text?: string
}

const Loader: FC<LoaderProps> = ({text}) => {
  return (
    <div className="Loader">
      <div className="loader"></div>
      {text && <span className="text">{text}</span>}
    </div>
  )
}

export default Loader
