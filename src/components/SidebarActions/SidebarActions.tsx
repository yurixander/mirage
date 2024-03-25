import {useMemo, type FC} from "react"
import IconButton from "../IconButton"
import {twMerge} from "tailwind-merge"
import {
  IoPaperPlane,
  IoExtensionPuzzle,
  IoExit,
  IoNotificationsSharp,
  IoCall,
} from "react-icons/io5"
import useSidebarActions, {
  SidebarModals,
  useSidebarModalActiveStore,
} from "@/components/SidebarActions/useSidebarActions"
import DirectMessageModal from "./DirectMessageModal"
import NotificationsModal from "./NotificationsModal"
import Modal from "../Modal"

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
        <Modal isVisible>{activeModalElement}</Modal>
      )}
    </>
  )
}

export type SidebarActionsProps = {
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({className}) => {
  const {onLogout, setActiveSidebarModal} = useSidebarActions()

  return (
    <>
      <SidebarModalsHandler />

      <section className={twMerge("inline-flex flex-col gap-4", className)}>
        <IconButton
          tooltip="Direct messages"
          Icon={IoPaperPlane}
          onClick={() => {
            setActiveSidebarModal(SidebarModals.DirectMessages)
          }}
        />

        <IconButton
          onClick={() => {
            // TODO: Handle here view calls.
          }}
          tooltip="Calls"
          Icon={IoCall}
        />

        <IconButton
          onClick={() => {
            setActiveSidebarModal(SidebarModals.Notifications)
          }}
          tooltip="Notifications"
          Icon={IoNotificationsSharp}
          isDotVisible
        />

        <IconButton
          onClick={() => {
            // TODO: Handle here open extensions.
          }}
          tooltip="Extensions"
          Icon={IoExtensionPuzzle}
        />

        <IconButton
          onClick={() => {
            void onLogout()
          }}
          tooltip="Sign out"
          Icon={IoExit}
        />
      </section>
    </>
  )
}

export default SidebarActions
