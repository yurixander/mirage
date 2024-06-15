import {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "../../../components/Button"
import Typography, {TypographyVariant} from "../../../components/Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../../../components/IconButton"
import {
  NotificationKind,
  type AnyNotification,
} from "../hooks/useCachedNotification"
import ActionNotification from "@/components/ActionNotification"
import InlineNotification from "@/components/InlineNotification"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

export type NotificationModalProps = {
  notifications: AnyNotification[]
  markAllNotificationsAsRead: () => void
  onClose: () => void
}

const NotificationsModal: FC<NotificationModalProps> = ({
  onClose,
  notifications,
  markAllNotificationsAsRead,
}) => {
  const notificationsUnread: AnyNotification[] = useMemo(
    () => notifications.filter(notification => !notification.data.isRead),
    [notifications]
  )

  const notificationsMarkAsRead: AnyNotification[] = useMemo(
    () => notifications.filter(notification => notification.data.isRead),
    [notifications]
  )

  return (
    <div
      className={twMerge(
        "flex size-full max-h-[80%] max-w-sm flex-col gap-2 rounded-xl bg-gray-50 p-2"
      )}>
      <div className="flex w-full p-2">
        <Typography
          className="mr-auto font-bold text-black "
          variant={TypographyVariant.H3}>
          Notifications
        </Typography>

        <Button
          variant={ButtonVariant.TextLink}
          isSmall
          label="Mark all as read"
          onClick={() => {
            markAllNotificationsAsRead()
            onClose()
          }}
        />

        <IconButton onClick={onClose} tooltip="Close" Icon={IoCloseCircle} />
      </div>

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        <div className="bg-slate-100">
          {notificationsUnread.map(notification =>
            notification.kind === NotificationKind.ActionNotification ? (
              <ActionNotification {...notification.data} />
            ) : (
              <InlineNotification {...notification.data} />
            )
          )}
        </div>

        {notificationsMarkAsRead.map(notification =>
          notification.kind === NotificationKind.ActionNotification ? (
            <ActionNotification {...notification.data} />
          ) : (
            <InlineNotification {...notification.data} />
          )
        )}
      </div>
    </div>
  )
}

export default NotificationsModal
