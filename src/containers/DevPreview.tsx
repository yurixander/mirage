import DirectMessageModal from "@/components/SidebarActions/DirectMessageModal"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="fixed inset-0 flex size-full w-screen flex-col items-center justify-center">
        <DirectMessageModal
          onClose={function (): void {
            throw new Error("Function not implemented.")
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
