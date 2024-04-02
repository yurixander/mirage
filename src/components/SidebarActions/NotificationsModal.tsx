import {stringToColor, timeFormatter} from "@/utils/util"
import {useMemo, type FC} from "react"
import {IoCheckbox, IoCloseCircle, IoTime, IoTrash} from "react-icons/io5"
import AvatarImage, {AvatarType} from "../Avatar"
import Button, {ButtonColor, ButtonSize, ButtonVariant} from "../Button"
import Typography, {TypographyVariant} from "../Typography"
import {twMerge} from "tailwind-merge"
import IconButton from "../IconButton"
import {useSidebarModalActiveStore} from "./useSidebarActions"
import {type LocalNotificationData} from "./useCachedNotifications"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

export interface NotificationProps extends LocalNotificationData {
  onDelete: () => void
  onMarkAsRead: () => void
  actions?: NotificationActions[]
}

const Notification: FC<NotificationProps> = ({
  body,
  notificationTime,
  actions,
  senderName,
  avatarSenderUrl,
  onDelete,
  isRead,
  onMarkAsRead,
}) => {
  const userComponent =
    senderName === undefined ? undefined : (
      <b style={{color: stringToColor(senderName)}}>{senderName}</b>
    )

  return (
    <div
      className={twMerge(
        "flex gap-2 p-2",
        !isRead && "rounded-lg bg-slate-100"
      )}>
      {senderName !== undefined && (
        <div className="size-full max-h-8 max-w-8 overflow-hidden rounded-lg">
          <AvatarImage
            isRounded={false}
            isLarge={false}
            avatarType={AvatarType.Message}
            displayName={senderName}
            avatarUrl={avatarSenderUrl}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex flex-row">
          <Typography variant={TypographyVariant.P}>
            {userComponent} {body}
          </Typography>
        </div>

        <div className="flex items-center gap-[2px]">
          <IoTime size={13} />

          <Typography variant={TypographyVariant.P}>
            {timeFormatter(notificationTime)}
          </Typography>
        </div>

        {actions !== undefined && (
          <div className="mt-2 flex flex-row gap-1">
            {actions.map(action => (
              <Button
                onClick={action.onClick}
                label={action.name}
                variant={action.actionVariant}
                color={ButtonColor.Black}
                size={ButtonSize.Small}
              />
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex">
        {!isRead && (
          <IconButton
            className="size-min"
            size={14}
            onClick={onMarkAsRead}
            tooltip="Remove notification"
            Icon={IoCheckbox}
          />
        )}

        <IconButton
          className="size-min"
          size={14}
          onClick={onDelete}
          tooltip="Remove notification"
          Icon={IoTrash}
        />
      </div>
    </div>
  )
}

export type NotificationsModalProps = {
  notifications: NotificationProps[]
  onMarkAllAsRead: () => void
}

const NotificationsModal: FC<NotificationsModalProps> = ({
  notifications,
  onMarkAllAsRead,
}) => {
  const {clearActiveSidebarModal} = useSidebarModalActiveStore()

  const notificationsUnread = useMemo(() => {
    const notificationsUnreadProps: React.JSX.Element[] = []

    for (const notification of notifications) {
      if (!notification.isRead) {
        notificationsUnreadProps.push(<Notification {...notification} />)
      }
    }

    return notificationsUnreadProps
  }, [notifications])

  const notificationsMarkAsRead = useMemo(() => {
    const notificationsUnreadProps: React.JSX.Element[] = []

    for (const notification of notifications) {
      if (notification.isRead) {
        notificationsUnreadProps.push(<Notification {...notification} />)
      }
    }

    return notificationsUnreadProps
  }, [notifications])

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
          onClick={() => {
            // TODO: Close modal after mark all as read.
            clearActiveSidebarModal()

            // TODO: Temporarily, remove in the future.
            onMarkAllAsRead()
          }}
          label="Mark all as read"
        />

        <IconButton
          onClick={clearActiveSidebarModal}
          tooltip="Close"
          Icon={IoCloseCircle}
        />
      </div>

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        <div className="bg-slate-100">{notificationsUnread}</div>
        {notificationsMarkAsRead}
      </div>
    </div>
  )
}

export default NotificationsModal
