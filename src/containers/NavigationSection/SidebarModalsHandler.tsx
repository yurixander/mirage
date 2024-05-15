import Modal from "@/components/Modal"
import {type FC, useMemo} from "react"
import DirectMessageModal from "./DirectMessageModal"
import NotificationsModal from "./NotificationsModal"
import {
  useSidebarModalActiveStore,
  SidebarModals,
} from "./hooks/useSidebarActions"

const SidebarModalsHandler: FC = () => {
  const {sidebarModalActive} = useSidebarModalActiveStore()

  const activeModalElement = useMemo(() => {
    if (sidebarModalActive === null) {
      return
    }

    switch (sidebarModalActive) {
      case SidebarModals.DirectMessages: {
        return <DirectMessageModal />
      }
      case SidebarModals.Notifications: {
        return <NotificationsModal />
      }
    }
  }, [sidebarModalActive])

  return (
    <>
      {activeModalElement !== undefined && (
        <Modal
          isVisible={sidebarModalActive !== null}
          children={activeModalElement}
        />
      )}
    </>
  )
}

export default SidebarModalsHandler
