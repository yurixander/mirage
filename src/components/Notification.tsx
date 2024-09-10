import {stringToColor, formatTime, assert, validateUrl} from "@/utils/util"
import {type FC} from "react"
import {IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import Typography, {TypographyVariant} from "./Typography"
import {notificationsBody, type NotificationType} from "@/utils/notifications"
import {Button} from "./ui/button"
import {useTranslation} from "react-i18next"

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
  const {t} = useTranslation()

  assert(notificationId.length > 0, "Notification id should not be empty.")

  if (senderAvatarUrl !== undefined) {
    assert(
      validateUrl(senderAvatarUrl),
      "Sender avatar url should be valid if defined."
    )
  }

  return (
    <div className={twMerge("flex gap-2 p-3", !isRead && "bg-slate-50")}>
      <AvatarImage
        isRounded
        displayName={sender}
        avatarUrl={senderAvatarUrl}
        avatarType={AvatarType.Profile}
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

          <div className="ml-auto flex items-center gap-1">
            {!isRead && (
              <Button
                className="size-max text-neutral-300 hover:bg-transparent"
                aria-label={t("Remove notification")}
                variant="ghost"
                size="icon"
                onClick={() => {
                  markAsRead(notificationId)
                }}>
                <IoCheckbox size={14} />
              </Button>
            )}

            <Button
              className="size-max text-neutral-300 hover:bg-transparent"
              variant="ghost"
              size="icon"
              onClick={() => {
                onDelete(notificationId)
              }}>
              <IoTrash size={14} />
            </Button>
          </div>
        </div>

        <Typography variant={TypographyVariant.BodyMedium}>
          {t(notificationsBody[type])}{" "}
          <b style={{color: stringToColor(roomName)}}>{roomName}</b>
        </Typography>

        {action !== undefined && (
          <Button
            variant="outline"
            className="mt-2 w-max"
            size="sm"
            onClick={action}>
            {t("Go to ⟶")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Notification
