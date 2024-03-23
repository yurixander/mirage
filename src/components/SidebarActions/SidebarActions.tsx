import {useState, type FC} from "react"
import IconButton from "../IconButton"
import {twMerge} from "tailwind-merge"
import {
  IoPaperPlane,
  IoExtensionPuzzle,
  IoExit,
  IoNotificationsSharp,
  IoCall,
} from "react-icons/io5"
import useSidebarActions from "@/components/SidebarActions/useSidebarActions"
import DirectMessageModal from "../DirectMessageModal"
import Modal from "../Modal"

export type SidebarActionsProps = {
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({className}) => {
  const {onLogout} = useSidebarActions()
  const [dialogs, setDialogs] = useState<React.JSX.Element[]>([])

  return (
    <>
      <Modal dialogs={dialogs} />
      <section className={twMerge("inline-flex flex-col gap-4", className)}>
        <IconButton
          onClick={() => {
            setDialogs(prev => [
              ...prev,
              <DirectMessageModal
                onClose={() => {
                  setDialogs([])
                }}
              />,
            ])
          }}
          tooltip="Direct messages"
          Icon={IoPaperPlane}
        />

        <IconButton
          onClick={() => {
            throw new Error("View calls not implemented.")
          }}
          tooltip="Calls"
          Icon={IoCall}
        />

        <IconButton
          onClick={() => {
            throw new Error("View notifications not implemented.")
          }}
          tooltip="Notifications"
          Icon={IoNotificationsSharp}
          isDotVisible
        />

        <IconButton
          onClick={() => {
            throw new Error("Open extensions not implemented.")
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
