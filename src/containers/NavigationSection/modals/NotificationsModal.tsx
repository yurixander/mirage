import {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonSize, ButtonVariant} from "../../../components/Button"
import Typography, {TypographyVariant} from "../../../components/Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../../../components/IconButton"
import {useSidebarModalActiveStore} from "../hooks/useSidebarActions"
import useCachedNotifications, {
  useNotificationsStateStore,
  type LocalNotificationData,
} from "../hooks/useCachedNotifications"
import {markAllNotificationsAsRead} from "@/utils/notifications"
import Notification from "../../../components/Notification"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

const NotificationsModal: FC = () => {
  const {clearActiveSidebarModal} = useSidebarModalActiveStore()
  const {onRequestChanges} = useNotificationsStateStore()
  const {notifications} = useCachedNotifications()

  const unreadNotifications: LocalNotificationData[] = useMemo(
    () => notifications.filter(notification => !notification.isRead),
    [notifications]
  )

  const readNotifications: LocalNotificationData[] = useMemo(
    () => notifications.filter(notification => notification.isRead),
    [notifications]
  )

  return (
    <div
      className={twMerge(
        "flex max-h-[80%] min-h-[300px] w-full max-w-sm flex-col gap-2 rounded-xl bg-white p-2"
      )}>
      <div className="flex w-full p-2">
        <Typography
          className="mr-auto text-black"
          variant={TypographyVariant.Heading}>
          Notifications
        </Typography>

        <Button
          variant={ButtonVariant.TextLink}
          size={ButtonSize.Small}
          label="Mark all as read"
          onClick={() => {
            markAllNotificationsAsRead()
            onRequestChanges()
            clearActiveSidebarModal()
          }}
        />

        <IconButton
          onClick={clearActiveSidebarModal}
          tooltip="Close"
          Icon={IoCloseCircle}
        />
      </div>

      {unreadNotifications.length === 0 && readNotifications.length === 0 && (
        <div className="flex size-full items-center justify-center">
          <Typography className="text-center text-slate-400">
            No notifications
          </Typography>
        </div>
      )}

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        <div className="bg-slate-100">
          {unreadNotifications.map(notification => (
            <Notification
              key={notification.notificationId}
              {...notification}
              hasActions={notification.hasActions ?? false}
              onRequestChanges={onRequestChanges}
            />
          ))}
        </div>

        {readNotifications.map(notification => (
          <Notification
            key={notification.notificationId}
            {...notification}
            hasActions={notification.hasActions ?? false}
            onRequestChanges={onRequestChanges}
          />
        ))}
      </div>
    </div>
  )
}

export default NotificationsModal
