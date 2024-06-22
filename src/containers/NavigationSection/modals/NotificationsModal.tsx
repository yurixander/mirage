import React, {useCallback, useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "../../../components/Button"
import Typography, {TypographyVariant} from "../../../components/Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../../../components/IconButton"
import Notification, {type NotificationProps} from "@/components/Notification"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

export type NotificationModalProps = {
  notifications: NotificationProps[]
  markAllNotificationsAsRead: () => void
  onClose: () => void
}

type Action = (() => void) | undefined

const NotificationsModal: FC<NotificationModalProps> = ({
  onClose,
  notifications,
  markAllNotificationsAsRead,
}) => {
  const onAction = useCallback(
    (action: Action): Action => {
      return () => {
        if (action === undefined) {
          return
        }

        action()
        onClose()
      }
    },
    [onClose]
  )

  const notificationsComponents: React.JSX.Element[] = useMemo(
    () =>
      notifications.map(anyNotification => (
        <Notification
          {...anyNotification}
          key={anyNotification.notificationId}
          action={onAction(anyNotification.action)}
        />
      )),
    [notifications, onAction]
  )

  return (
    <div
      className={twMerge(
        "m-2 flex size-full max-h-[80%] max-w-sm flex-col gap-2 rounded-xl border border-slate-300 bg-gray-50 p-2 shadow-2xl"
      )}>
      <div className="flex w-full p-2">
        <Typography className="mr-auto" variant={TypographyVariant.Heading}>
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

      {notifications.length === 0 && (
        <div className="flex size-full items-center justify-center">
          <Typography className="text-center text-slate-400">
            No notifications
          </Typography>
        </div>
      )}

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        {notificationsComponents}
      </div>
    </div>
  )
}

export default NotificationsModal
