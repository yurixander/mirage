import Loader from "@/components/Loader"
import Notification, {type NotificationProps} from "@/components/Notification"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Heading, Text} from "@/components/ui/typography"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {useMemo, type FC} from "react"

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
  const {t} = useTranslation()

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
      <HoverCardTrigger asChild children={children} />

      <HoverCardContent asChild side="right">
        <div className="m-2 max-h-96 w-[448px] max-w-md overflow-auto dark:bg-neutral-900">
          {isLoading ? (
            <Loader className="p-4" text={t(LangKey.LoadingNotifications)} />
          ) : notifications.length === 0 ? (
            <Text size="4" className="p-3">
              {t(LangKey.NotificationsEmpty)}
            </Text>
          ) : (
            <div className="flex flex-col gap-4">
              <Heading>{t(LangKey.Notifications)}</Heading>

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
