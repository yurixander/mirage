import Loader from "@/components/Loader"
import Notification, {type NotificationProps} from "@/components/Notification"
import Typography, {TypographyVariant} from "@/components/Typography"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {useMemo, type FC} from "react"
import {useTranslation} from "react-i18next"

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
  children: React.JSX.Element
}

const NotificationsTray: FC<NotificationsTrayProps> = ({
  isLoading,
  notifications,
  children,
}) => {
  const {t} = useTranslation("notifications")

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
      <HoverCardTrigger>{children}</HoverCardTrigger>

      <HoverCardContent asChild side="right">
        <div className="m-2 max-h-96 w-[448px] max-w-md overflow-auto">
          {isLoading ? (
            <Loader className="p-4" text={t("Loading Notifications")} />
          ) : notifications.length === 0 ? (
            <Typography className="p-3">{t("NotificationsEmpty")}</Typography>
          ) : (
            <div className="flex flex-col gap-4">
              <Typography variant={TypographyVariant.Heading}>
                {t("Notifications")}
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
