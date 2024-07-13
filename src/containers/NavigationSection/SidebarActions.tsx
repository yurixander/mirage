import IconButton from "@/components/IconButton"
import {useState, type FC} from "react"
import {
  IoCall,
  IoExit,
  IoNotifications,
  IoPaperPlane,
  IoSearch,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import NotificationBoxPopup from "./modals/NotificationBoxPopup"
import useNotifications from "./hooks/useNotifications"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"

const SidebarActions: FC<{className?: string}> = ({className}) => {
  const {setActiveModal} = useActiveModalStore()
  const [isNotificationBoxVisible, setNotificationBoxVisible] = useState(false)

  const {isLoading, notifications, containsUnreadNotifications} =
    useNotifications()

  return (
    <>
      <NotificationBoxPopup
        isVisible={isNotificationBoxVisible}
        isLoading={isLoading}
        notifications={notifications}
        onClose={() => {
          setNotificationBoxVisible(false)
        }}
      />

      <div
        className={twMerge(
          "flex flex-col items-center gap-2.5 pb-2",
          className
        )}>
        <IconButton
          tooltip="Direct Chats"
          iconClassName="text-slate-400"
          Icon={IoPaperPlane}
          onMouseEnter={() => {
            setNotificationBoxVisible(false)
          }}
          onClick={() => {
            setActiveModal(Modals.DirectMessages)
          }}
        />

        <IconButton
          tooltip="Notifications"
          iconClassName="text-slate-400"
          Icon={IoNotifications}
          isDotVisible={containsUnreadNotifications}
          onClick={() => {}}
          onMouseEnter={() => {
            setNotificationBoxVisible(true)
          }}
        />

        <IconButton
          tooltip="Search"
          iconClassName="text-slate-400"
          Icon={IoSearch}
          onClick={() => {}}
        />

        <IconButton
          tooltip="Calls"
          iconClassName="text-slate-400"
          Icon={IoCall}
          onClick={() => {}}
        />

        <IconButton
          tooltip="Exit"
          iconClassName="text-slate-400"
          Icon={IoExit}
          onClick={() => {}}
        />
      </div>
    </>
  )
}

export default SidebarActions
