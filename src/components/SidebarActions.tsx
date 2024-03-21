import {useState, type FC} from "react"
import IconButton from "./IconButton"
import {twMerge} from "tailwind-merge"
import {
  IoPaperPlane,
  IoExtensionPuzzle,
  IoExit,
  IoNotificationsSharp,
  IoCall,
} from "react-icons/io5"
import useSidebarActions from "@/hooks/matrix/useSidebarActions"
import {createPortal} from "react-dom"
import DirectMessageModal from "./DirectMessageModal"

export type SidebarActionsProps = {
  onViewDirectMessages: () => void
  onViewCalls: () => void
  onViewNotifications: () => void
  onOpenExtensions: () => void
  onLogout: () => void
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({
  onViewCalls,
  onViewNotifications,
  onOpenExtensions,
  className,
}) => {
  const {onLogout} = useSidebarActions()
  const [isDirectMessageModalVisible, setDirectMessageModalVisible] =
    useState(false)

  return (
    <>
      {isDirectMessageModalVisible &&
        createPortal(
          <div className="fixed inset-0 flex size-full w-screen flex-col items-center justify-center">
            <DirectMessageModal
              onClose={() => {
                setDirectMessageModalVisible(false)
              }}
            />
          </div>,
          document.body
        )}
      <section className={twMerge("inline-flex flex-col gap-4", className)}>
        <IconButton
          onClick={() => {
            setDirectMessageModalVisible(true)
          }}
          tooltip="Direct messages"
          Icon={IoPaperPlane}
        />

        <IconButton onClick={onViewCalls} tooltip="Calls" Icon={IoCall} />

        <IconButton
          onClick={onViewNotifications}
          tooltip="Notifications"
          Icon={IoNotificationsSharp}
          isDotVisible
        />

        <IconButton
          onClick={onOpenExtensions}
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
