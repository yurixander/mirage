import {type FC} from "react"
import {type InlineNotificationProps} from "./InlineNotification"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {IoTime, IoCheckbox, IoTrash} from "react-icons/io5"
import Button from "./Button"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"
import {twMerge} from "tailwind-merge"
import {stringToColor, timeFormatter} from "@/utils/util"
import {notificationsBody} from "@/containers/NavigationSection/hooks/useCachedNotifications"

export type ActionNotificationProps = {
  onAction: () => void
} & InlineNotificationProps

const ActionNotification: FC<ActionNotificationProps> = ({
  isRead,
  roomName,
  sender,
  senderAvatarUrl,
  type,
  onAction,
  notificationTime,
  markAsRead,
  onDelete,
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

        <Button isSmall onClick={onAction} label="View" className="max-w-14" />
      </div>
    </div>
  )
}

export default ActionNotification
