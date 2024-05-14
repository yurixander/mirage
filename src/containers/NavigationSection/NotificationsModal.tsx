import {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonSize, ButtonVariant} from "../../components/Button"
import Typography, {TypographyVariant} from "../../components/Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../../components/IconButton"
import {useSidebarModalActiveStore} from "./hooks/useSidebarActions"
import useCachedNotifications, {
  useNotificationsStateStore,
  type LocalNotificationData,
} from "./hooks/useCachedNotifications"
import {markAllNotificationsAsRead} from "@/utils/notifications"
import Notification from "./Notification"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

const NotificationsModal: FC = () => {
  const {clearActiveSidebarModal} = useSidebarModalActiveStore()
  const {onRequestChanges} = useNotificationsStateStore()
  const {notifications} = useCachedNotifications()

  const notificationsUnread: LocalNotificationData[] = useMemo(
    () => notifications.filter(notification => !notification.isRead),
    [notifications]
  )

  const notificationsMarkAsRead: LocalNotificationData[] = useMemo(
    () => notifications.filter(notification => notification.isRead),
    [notifications]
  )

  return (
    <div
      className={twMerge(
        "flex size-full max-h-[80%] max-w-sm flex-col gap-2 rounded-xl bg-white p-2"
      )}>
      <div className="flex w-full p-2">
        <Typography
          className="mr-auto font-bold text-black "
          variant={TypographyVariant.H3}>
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

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        <div className="bg-slate-100">
          {notificationsUnread.map(notification => (
            <Notification
              key={notification.notificationId}
              {...notification}
              hasActions={notification.hasActions ?? false}
              onRequestChanges={onRequestChanges}
            />
          ))}
        </div>

        {notificationsMarkAsRead.map(notification => (
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
