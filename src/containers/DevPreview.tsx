import DirectMessageModal from "@/components/DirectMessageModal"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="fixed inset-0 flex size-full w-screen flex-col items-center justify-center">
        <DirectMessageModal />
      </div>
    </>
  )
}

export default DevelopmentPreview
