import {type FC} from "react"
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
} from "@/components/SidebarActions/useSidebarActions"
import DirectMessageModal from "./DirectMessageModal"
import NotificationsModal from "./NotificationsModal"

export type SidebarActionsProps = {
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({className}) => {
  const {
    onLogout,
    isDirectMessageVisible,
    showAndCloseSidebarModal,
    isNotificationsVisible,
  } = useSidebarActions()

  return (
    <>
      <DirectMessageModal
        isVisible={isDirectMessageVisible}
        onClose={() => {
          showAndCloseSidebarModal(SidebarModals.DirectMessages, false)
        }}
      />

      <NotificationsModal
        isVisible={isNotificationsVisible}
        onClose={() => {
          showAndCloseSidebarModal(SidebarModals.Notifications, false)
        }}
      />

      <section className={twMerge("inline-flex flex-col gap-4", className)}>
        <IconButton
          tooltip="Direct messages"
          Icon={IoPaperPlane}
          onClick={() => {
            showAndCloseSidebarModal(SidebarModals.DirectMessages, true)
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
            showAndCloseSidebarModal(SidebarModals.Notifications, true)
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
