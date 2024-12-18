import Loader from "@/components/Loader"
import Notification, {type NotificationProps} from "@/components/Notification"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Heading, Text} from "@/components/ui/typography"
import useBreakpoint from "@/hooks/util/useMediaQuery"
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
  const {isSmall} = useBreakpoint()

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

      <HoverCardContent asChild side={isSmall ? "right" : undefined}>
        <div className="max-h-96 w-screen overflow-auto dark:bg-neutral-900 sm:m-2 sm:w-[448px] sm:max-w-md">
          {isLoading ? (
            <Loader className="p-4" text={t(LangKey.LoadingNotifications)} />
          ) : notificationsComponents.length === 0 ? (
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
