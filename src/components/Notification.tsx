import {
  notificationsBody,
  type NotificationType,
} from "@/containers/NavigationSection/hooks/useCachedNotifications"
import {stringToColor, formatTime} from "@/utils/util"
import {type FC} from "react"
import {IoTime, IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import Button from "./Button"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"

export type NotificationProps = {
  type: NotificationType
  notificationId: string
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  sender: string
  senderAvatarUrl?: string
  onDelete: (notificationId: string) => void
  markAsRead: (notificationId: string) => void
  action?: () => void
}

const Notification: FC<NotificationProps> = ({
  isRead,
  markAsRead,
  notificationTime,
  onDelete,
  roomName,
  sender,
  type,
  action,
  senderAvatarUrl,
  notificationId,
}) => {
  return (
    <div
      className={twMerge(
        "flex gap-2 p-2",
        !isRead && "rounded-lg bg-slate-100"
      )}>
      <AvatarImage
        isRounded={false}
        avatarType={AvatarType.Message}
        displayName={sender}
        avatarUrl={senderAvatarUrl}
      />

      <div className="flex w-full flex-col">
        <div className="flex h-max items-center gap-2">
          <Typography
            variant={TypographyVariant.BodyMedium}
            style={{color: stringToColor(sender)}}>
            {sender}
          </Typography>

          <div className="flex h-max items-center gap-0.5">
            <IoTime size={13} className="text-gray-300" />

            <Typography
              className="text-gray-300"
              variant={TypographyVariant.BodySmall}>
              {formatTime(notificationTime)}
            </Typography>
          </div>

          <div className="ml-auto flex">
            {!isRead && (
              <IconButton
                className="size-min"
                size={14}
                tooltip="Remove notification"
                Icon={IoCheckbox}
                onClick={() => {
                  markAsRead(notificationId)
                }}
              />
            )}

            <IconButton
              className="size-min"
              size={14}
              tooltip="Remove notification"
              Icon={IoTrash}
              onClick={() => {
                onDelete(notificationId)
              }}
            />
          </div>
        </div>

        <Typography
          className="flex gap-1"
          variant={TypographyVariant.BodyMedium}>
          {notificationsBody[type]}
          <Typography
            variant={TypographyVariant.BodyMedium}
            style={{color: stringToColor(roomName)}}>
            {roomName}
          </Typography>
        </Typography>

        {action !== undefined && (
          <Button isSmall onClick={action} label="View" className="max-w-14" />
        )}
      </div>
    </div>
  )
}

export default Notification
