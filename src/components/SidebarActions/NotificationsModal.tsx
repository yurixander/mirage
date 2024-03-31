import {stringToColor, timeFormatter} from "@/utils/util"
import {type FC} from "react"
import {IoCloseCircle, IoTime} from "react-icons/io5"
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
  actions?: NotificationActions[]
}

const Notification: FC<NotificationProps> = ({
  body,
  notificationTime,
  actions,
  avatarSenderName,
  senderName,
}) => {
  const userComponent =
    senderName === undefined ? undefined : (
      <b style={{color: stringToColor(senderName)}}>{senderName}</b>
    )

  return (
    <div className="flex gap-2 p-2">
      {senderName !== undefined && (
        <div className="size-full max-h-10 max-w-10 overflow-hidden rounded-lg">
          <AvatarImage
            isRounded={false}
            isLarge={false}
            avatarType={AvatarType.Message}
            displayName={senderName}
            avatarUrl={avatarSenderName}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex flex-row">
          <Typography>
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
    </div>
  )
}

export type NotificationsModalProps = {
  notifications: NotificationProps[]
  onAllMaskAsRead: () => void
}

const NotificationsModal: FC<NotificationsModalProps> = ({
  notifications,
  onAllMaskAsRead,
}) => {
  const {clearActiveSidebarModal} = useSidebarModalActiveStore()

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
            onAllMaskAsRead()
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
        {notifications.map(notification => (
          <Notification {...notification} />
        ))}
      </div>
    </div>
  )
}

export default NotificationsModal
