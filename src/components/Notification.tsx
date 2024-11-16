import {stringToColor, formatTime, assert, validateUrl} from "@/utils/util"
import {type FC} from "react"
import {IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {notificationsBody, type NotificationType} from "@/utils/notifications"
import {Button, IconButton} from "./ui/button"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "./ui/typography"

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
    <div
      className={twMerge(
        "flex gap-2 p-3",
        !isRead && "bg-neutral-50 dark:bg-neutral-900"
      )}>
      <AvatarImage
        isRounded
        displayName={sender}
        avatarUrl={senderAvatarUrl}
        avatarType={AvatarType.Profile}
      />

      <div className="flex w-full flex-col">
        <div className="flex h-max items-center gap-2">
          <Heading level="h6" style={{color: stringToColor(sender)}}>
            {sender}
          </Heading>

          <time className="shrink-0 text-xs text-foreground">
            {formatTime(notificationTime)}
          </time>

          <div className="ml-auto flex items-center">
            {!isRead && (
              <IconButton
                className="size-6 text-neutral-500"
                aria-label={t(LangKey.MarkAsRead)}
                tooltip={t(LangKey.MarkAsRead)}
                onClick={() => {
                  markAsRead(notificationId)
                }}>
                <IoCheckbox size={14} />
              </IconButton>
            )}

            <IconButton
              className="size-6 text-neutral-500"
              aria-label={t(LangKey.RemoveNotification)}
              tooltip={t(LangKey.RemoveNotification)}
              onClick={() => {
                onDelete(notificationId)
              }}>
              <IoTrash size={14} />
            </IconButton>
          </div>
        </div>

        <Text>
          {t(notificationsBody[type])}{" "}
          <b style={{color: stringToColor(roomName)}}>{roomName}</b>
        </Text>

        {action !== undefined && (
          <Button
            variant="outline"
            className="mt-2 w-max"
            size="sm"
            onClick={action}>
            {t(LangKey.GoTo)}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Notification
