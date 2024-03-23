import NotificationsModal from "@/components/SidebarActions/NotificationsModal"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full w-screen flex-col items-center justify-center bg-purple-600">
        <NotificationsModal />
      </div>
    </>
  )
}

export default DevelopmentPreview
