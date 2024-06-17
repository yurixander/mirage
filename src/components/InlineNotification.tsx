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

      <div className="flex w-full flex-col">
        <div className="flex h-max items-center gap-2">
          <Typography
            variant={TypographyVariant.BodyMedium}
            style={{color: stringToColor(sender)}}>
            {sender}
          </Typography>

          <div className="flex h-max items-center gap-[2px]">
            <IoTime size={13} className="text-gray-300" />

            <Typography
              className="text-gray-300"
              variant={TypographyVariant.BodySmall}>
              {timeFormatter(notificationTime)}
            </Typography>
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
      </div>
    </div>
  )
}

export default InlineNotification
