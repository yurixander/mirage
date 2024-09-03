import Loader from "@/components/Loader"
import Notification, {type NotificationProps} from "@/components/Notification"
import Typography, {TypographyVariant} from "@/components/Typography"
import {Button} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {useMemo, type FC} from "react"
import {IoNotifications} from "react-icons/io5"

const sortNotificationsByReadState = (
  a: NotificationProps,
  b: NotificationProps
): number => {
  if (a.isRead === b.isRead) {
    return a.notificationTime - b.notificationTime
  }

  return a.isRead ? 1 : -1
}

export type NotificationsTrayProps = {
  isLoading: boolean
  notifications: NotificationProps[]
}

const NotificationsTray: FC<NotificationsTrayProps> = ({
  isLoading,
  notifications,
}) => {
  const notificationsComponents: React.JSX.Element[] = useMemo(
    () =>
      notifications
        .sort(sortNotificationsByReadState)
        .map(anyNotification => (
          <Notification
            {...anyNotification}
            key={anyNotification.notificationId}
          />
        )),
    [notifications]
  )

  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger>
        <Button
          className="text-slate-400 hover:text-slate-800"
          variant="ghost"
          size="icon">
          <IoNotifications size={20} />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent asChild side="right">
        <div className="max-h-96 w-full max-w-md overflow-auto">
          {isLoading ? (
            <Loader className="p-4" text="Loading Notifications" />
          ) : notifications.length === 0 ? (
            <Typography className="p-3">You not have notifications</Typography>
          ) : (
            <div className="flex flex-col gap-4">
              <Typography variant={TypographyVariant.Heading}>
                Notifications
              </Typography>

              <div className="flex h-72 flex-col overflow-y-scroll scrollbar-hide">
                {notificationsComponents}
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default NotificationsTray
