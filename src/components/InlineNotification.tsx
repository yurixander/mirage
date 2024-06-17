import {
  notificationsBody,
  type NotificationType,
} from "@/containers/NavigationSection/hooks/useCachedNotifications"
import {stringToColor, timeFormatter} from "@/utils/util"
import {type FC} from "react"
import {IoTime, IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"

export interface InlineNotificationProps {
  type: NotificationType
  notificationId: string
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  sender: string
  senderAvatarUrl?: string
  onDelete: () => void
  markAsRead: () => void
}

const InlineNotification: FC<InlineNotificationProps> = ({
  isRead,
  roomName,
  sender,
  senderAvatarUrl,
  markAsRead,
  notificationTime,
  onDelete,
  type,
}) => {
  return (
    <div
      className={twMerge(
        "flex gap-2 p-2",
        !isRead && "rounded-lg bg-slate-100"
      )}>
      {/* TODO: Replace later for use new variation `Small` */}
      <AvatarImage
        isRounded={false}
        isLarge={false}
        avatarType={AvatarType.Message}
        displayName={sender}
        avatarUrl={senderAvatarUrl}
      />

      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Typography
            className="shrink-0"
            variant={TypographyVariant.BodySmall}
            style={{color: stringToColor(sender)}}>
            {sender}
          </Typography>

          <Typography
            className="break-words"
            variant={TypographyVariant.BodySmall}>
            {notificationsBody[type]}{" "}
            <span style={{color: stringToColor(roomName)}}>{roomName}</span>
          </Typography>
        </div>

        <div className="flex items-center gap-[2px]">
          <IoTime size={13} />

          <Typography variant={TypographyVariant.BodySmall}>
            {timeFormatter(notificationTime)}
          </Typography>
        </div>
      </div>

      <div className="ml-auto flex">
        {!isRead && (
          <IconButton
            className="size-min"
            size={14}
            tooltip="Remove notification"
            Icon={IoCheckbox}
            onClick={markAsRead}
          />
        )}

        <IconButton
          className="size-min"
          size={14}
          tooltip="Remove notification"
          Icon={IoTrash}
          onClick={onDelete}
        />
      </div>
    </div>
  )
}

export default InlineNotification
