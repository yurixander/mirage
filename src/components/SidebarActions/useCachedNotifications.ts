import {useCallback, useState} from "react"

export type LocalNotificationData = {
  body: string
  isRead: boolean
  notificationId: string
  notificationTime: number
  senderName?: string
  avatarSenderUrl?: string
}

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "notifications"

const useCachedNotifications = () => {
  const [cachedNotifications, setNotifications] = useState<
    LocalNotificationData[]
  >(() => {
    const savedNotifications = localStorage.getItem(
      NOTIFICATIONS_LOCAL_STORAGE_KEY
    )

    return savedNotifications ? JSON.parse(savedNotifications) : []
  })

  const saveNotification = useCallback(
    (notification: LocalNotificationData) => {
      setNotifications(prevNotifications => {
        if (
          prevNotifications.some(
            prevNotification =>
              prevNotification.notificationId === notification.notificationId
          )
        ) {
          return prevNotifications
        }

        const updatedNotifications = [notification, ...prevNotifications]

        localStorage.setItem(
          NOTIFICATIONS_LOCAL_STORAGE_KEY,
          JSON.stringify(updatedNotifications)
        )

        return updatedNotifications
      })
    },
    []
  )

  const clearNotifications = () => {
    const emptyNotifications: LocalNotificationData[] = []

    setNotifications(emptyNotifications)

    localStorage.setItem(
      NOTIFICATIONS_LOCAL_STORAGE_KEY,
      JSON.stringify(emptyNotifications)
    )
  }

  return {cachedNotifications, saveNotification, clearNotifications}
}

export default useCachedNotifications
