import {useState, type FC} from "react"
import {createPortal} from "react-dom"

const DevPreview: FC = () => {
  const [popupContainer, setPopupContainer] = useState(false)
  const base = document.getElementById("root")

  return (
    <>{base && createPortal(<div className="size-10 bg-black"></div>, base)}</>
  )
}

export default DevPreview
