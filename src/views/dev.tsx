import DMTrayPopup from "@/containers/NavigationSection/DMTrayPopup"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-end justify-center">
        <DMTrayPopup />
      </div>
    </>
  )
}

export default DevelopmentPreview
