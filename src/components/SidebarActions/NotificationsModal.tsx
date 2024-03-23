import {stringToColor, timeFormatter} from "@/utils/util"
import {type FC} from "react"
import {IoTime} from "react-icons/io5"
import AvatarImage, {AvatarType} from "../Avatar"
import Button, {ButtonColor, ButtonSize, ButtonVariant} from "../Button"
import Typography, {TypographyVariant} from "../Typography"
import {twMerge} from "tailwind-merge"

export type NotificationsModalProps = {
  className?: string
}

type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

type NotificationProps = {
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
  const userComponent = displayName !== undefined && (
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

      <div className="flex flex-col">
        <div className="flex flex-row">
          <Typography className="text-xs">
            {userComponent ?? ""} {event}
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

const NotificationsModal: FC<NotificationsModalProps> = ({className}) => {
  return (
    <div
      className={twMerge(
        "flex size-full max-h-[80%] max-w-[35%] flex-col gap-2 rounded-xl bg-white p-2",
        className
      )}>
      <div className="flex w-full justify-between p-2">
        <Typography
          className="font-bold text-black"
          variant={TypographyVariant.H3}>
          Notifications
        </Typography>

        <Button
          variant={ButtonVariant.TextLink}
          size={ButtonSize.Small}
          color={ButtonColor.Black}
          onClick={() => {
            // TODO: Handle here close this modal.
          }}
          label="Mark all as read"
        />
      </div>

      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
        <Notification
          event="is trying to start a conversation with you."
          displayName="Criss"
          lastNotificationTime={Date.now()}
          actions={[
            {name: "Accept", onClick: () => {}},
            {
              name: "Decline",
              onClick: () => {},
              actionVariant: ButtonVariant.TextLink,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default NotificationsModal
