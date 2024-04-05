import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedNotifications, {
  NotificationsSyncState,
  useNotificationsStateStore,
} from "./useCachedNotifications"
import {markAllNotificationsAsRead} from "@/utils/notifications"

const useNotifications = () => {
  const {client} = useConnection()
  const {setNotificationsState} = useNotificationsStateStore()
  const [notifications, setNotifications] = useState<NotificationProps[]>([])
  const {cachedNotifications} = useCachedNotifications()

  const onRequestChanges = useCallback(() => {
    setNotificationsState(NotificationsSyncState.Pending)
  }, [setNotificationsState])

  const onMarkAllAsRead = useCallback(() => {
    markAllNotificationsAsRead()
    setNotificationsState(NotificationsSyncState.Processed)
  }, [setNotificationsState])

  useEffect(() => {
    if (client === null) {
      return
    }

    // Handle history user notifications.
    const newNotifications: NotificationProps[] = []

    for (const notification of cachedNotifications) {
      newNotifications.push({
        body: notification.body,
        isRead: notification.isRead,
        notificationTime: notification.notificationTime,
        notificationId: notification.notificationId,
        senderName: notification.senderName,
        avatarSenderUrl: notification.avatarSenderUrl,
        onRequestChanges,
      })
    }

    setNotifications(newNotifications)
  }, [cachedNotifications, client, onRequestChanges])

  return {notifications, onMarkAllAsRead}
}

export default useNotifications
