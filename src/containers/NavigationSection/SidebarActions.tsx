import Typography, {TypographyVariant} from "@/components/Typography"
import {useState, type FC} from "react"
import {type IconType} from "react-icons"
import {
  IoCall,
  IoExit,
  IoNotifications,
  IoPaperPlane,
  IoSearch,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {createPortal} from "react-dom"
import NotificationsModal from "./modals/NotificationsModal"
import useCachedNotifications from "./hooks/useCachedNotifications"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"

export type SidebarActionsProps = {
  onDirectMessages: () => void
  onSearch: () => void
  onCalls: () => void
  onExit: () => void
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({
  className,
  onCalls,
  onDirectMessages,
  onExit,
  onSearch,
}) => {
  const {notifications, markAllNotificationsAsRead, unreadNotifications} =
    useCachedNotifications()

  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false)

  return (
    <>
      {notificationsModalVisible &&
        createPortal(
          <div
            className={twMerge(
              "absolute z-50 flex size-full w-screen flex-col items-start justify-end"
            )}>
            <NotificationsModal
              notifications={notifications}
              onClose={() => {
                setNotificationsModalVisible(false)
              }}
              markAllNotificationsAsRead={markAllNotificationsAsRead}
            />
          </div>,
          document.querySelector(`#${ModalRenderLocation.ChatContainer}`) ??
            document.body
        )}
      <div className={twMerge("flex flex-col gap-2", className)}>
        <SidebarActionItem
          name="Direct Chats"
          icon={IoPaperPlane}
          onClick={onDirectMessages}
        />

        <SidebarActionItem
          name="Notifications"
          icon={IoNotifications}
          unreadNotifications={unreadNotifications}
          onClick={() => {
            setNotificationsModalVisible(true)
          }}
        />

        <SidebarActionItem name="Search" icon={IoSearch} onClick={onSearch} />

        <SidebarActionItem name="Calls" icon={IoCall} onClick={onCalls} />

        <SidebarActionItem name="Exit" icon={IoExit} onClick={onExit} />
      </div>
    </>
  )
}

type SidebarActionItemProps = {
  icon: IconType
  name: string
  onClick: () => void
  unreadNotifications?: number
}

const SidebarActionItem: FC<SidebarActionItemProps> = ({
  icon,
  name,
  onClick,
  unreadNotifications,
}) => {
  const Icon = icon

  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-200"
      onClick={onClick}
      role="button"
      aria-hidden="true">
      <Icon className="text-slate-400" />

      <Typography
        variant={TypographyVariant.BodyMedium}
        className="line-clamp-1 font-medium text-slate-600">
        {name}
      </Typography>

      {unreadNotifications !== undefined && unreadNotifications > 0 && (
        <div className="flex size-4 items-center justify-center rounded-full bg-red-500">
          <Typography
            variant={TypographyVariant.BodySmall}
            className="text-white">
            {unreadNotifications}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default SidebarActions
