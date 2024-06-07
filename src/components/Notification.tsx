import useMatrixAction from "@/hooks/matrix/useMatrixAction"
import {
  deleteNotificationById,
  markAsReadByNotificationId,
} from "@/utils/notifications"
import {stringToColor, timeFormatter} from "@/utils/util"
import {type FC} from "react"
import {IoTime, IoCheckbox, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"
import Button, {ButtonVariant} from "./Button"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"
import {type LocalNotificationData} from "../containers/NavigationSection/hooks/useCachedNotifications"

export interface NotificationProps extends LocalNotificationData {
  onRequestChanges: () => void
  hasActions: boolean
}

const Notification: FC<NotificationProps> = ({
  body,
  notificationTime,
  hasActions,
  senderName,
  avatarSenderUrl,
  notificationId,
  isRead,
  onRequestChanges,
}) => {
  const onJoinRoom = useMatrixAction(client => {
    if (!hasActions) {
      return null
    }

    void client.joinRoom(notificationId)
    deleteNotificationById(notificationId)
    onRequestChanges()
  })

  // TODO: Launch `Toast` if you rejected the room invitation.
  const onLeaveRoom = useMatrixAction(client => {
    if (!hasActions) {
      return
    }

    void client.leave(notificationId)
    deleteNotificationById(notificationId)
    onRequestChanges()
  })

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

        {hasActions && (
          <div className="mt-2 flex flex-row gap-1">
            <Button
              label="Accept"
              isSmall
              onClick={() => {
                if (onJoinRoom === null) {
                  return
                }

                void onJoinRoom()
              }}
            />

            <Button
              label="Decline"
              variant={ButtonVariant.TextLink}
              isSmall
              onClick={() => {
                if (onLeaveRoom === null) {
                  return
                }

                void onLeaveRoom()
              }}
            />
          </div>
        )}
      </div>

      <div className="ml-auto flex">
        {!isRead && (
          <IconButton
            className="size-min"
            size={14}
            tooltip="Remove notification"
            Icon={IoCheckbox}
            onClick={() => {
              markAsReadByNotificationId(notificationId)
              onRequestChanges()
            }}
          />
        )}

        <IconButton
          className="size-min"
          size={14}
          tooltip="Remove notification"
          Icon={IoTrash}
          onClick={() => {
            deleteNotificationById(notificationId)
            onRequestChanges()
          }}
        />
      </div>
    </div>
  )
}

export default Notification
