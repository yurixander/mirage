import {stringToColor, formatTime} from "@/utils/util"
import {type FC} from "react"
import {IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import Button from "./Button"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"
import {notificationsBody, type NotificationType} from "@/utils/notifications"

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
        isRounded
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

          <Typography
            className="text-gray-300"
            variant={TypographyVariant.BodySmall}>
            {formatTime(notificationTime)}
          </Typography>

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

        <Typography variant={TypographyVariant.BodyMedium}>
          {notificationsBody[type]}{" "}
          <b style={{color: stringToColor(roomName)}}>{roomName}</b>
        </Typography>

        {action !== undefined && (
          <Button
            isSmall
            onClick={action}
            label="Go to ⟶"
            className="mt-1 max-w-max"
          />
        )}
      </div>
    </div>
  )
}

export default Notification
