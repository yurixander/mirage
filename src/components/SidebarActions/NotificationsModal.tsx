import {stringToColor, timeFormatter} from "@/utils/util"
import {type FC} from "react"
import {IoCloseCircle, IoTime} from "react-icons/io5"
import AvatarImage, {AvatarType} from "../Avatar"
import Button, {ButtonColor, ButtonSize, ButtonVariant} from "../Button"
import Typography, {TypographyVariant} from "../Typography"
import {twMerge} from "tailwind-merge"
import Modal from "../Modal"
import IconButton from "../IconButton"
import useNotifications from "./useNotifications"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

export type NotificationProps = {
  event: string
  lastNotificationTime: number
  displayName?: string
  actions?: NotificationActions[]
}

const Notification: FC<NotificationProps> = ({
  displayName,
  event,
  actions,
  lastNotificationTime,
}) => {
  const userComponent =
    displayName === undefined ? undefined : (
      <b style={{color: stringToColor(displayName)}}>{displayName}</b>
    )

  return (
    <div className="flex gap-2 p-2">
      {displayName !== undefined && (
        <div className="overflow-hidden rounded-lg">
          <AvatarImage
            isRounded={false}
            isLarge={false}
            avatarType={AvatarType.Profile}
            displayName={displayName}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex flex-row">
          <Typography>
            {userComponent} {event}
          </Typography>
        </div>

        <div className="flex items-center gap-[2px]">
          <IoTime size={13} />

          <Typography variant={TypographyVariant.P}>
            {timeFormatter(lastNotificationTime)}
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
  isVisible: boolean
  className?: string
  onClose: () => void
}

const NotificationsModal: FC<NotificationsModalProps> = ({
  className,
  isVisible,
  onClose,
}) => {
  const {notifications} = useNotifications()

  return (
    <Modal
      isVisible={isVisible}
      children={
        <div
          className={twMerge(
            "flex size-full max-h-[80%] max-w-sm flex-col gap-2 rounded-xl bg-white p-2",
            className
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
                onClose()
              }}
              label="Mark all as read"
            />

            <IconButton
              onClick={onClose}
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
      }
    />
  )
}

export default NotificationsModal
