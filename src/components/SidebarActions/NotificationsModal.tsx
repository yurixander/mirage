import {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonColor, ButtonSize, ButtonVariant} from "../Button"
import Typography, {TypographyVariant} from "../Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../IconButton"
import {useSidebarModalActiveStore} from "./useSidebarActions"
import useCachedNotifications, {
  useNotificationsStateStore,
  type LocalNotificationData,
} from "./useCachedNotifications"
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
          color={ButtonColor.Black}
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
              {...notification}
              hasActions={notification.hasActions ?? false}
              onRequestChanges={onRequestChanges}
            />
          ))}
        </div>

        {notificationsMarkAsRead.map(notification => (
          <Notification
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
