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

  const deleteNotificationById = useCallback((notificationId: string) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.filter(
        notification => notification.notificationId !== notificationId
      )

      localStorage.setItem(
        NOTIFICATIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(updatedNotifications)
      )

      return updatedNotifications
    })
  }, [])

  const saveNotification = useCallback(
    (notification: LocalNotificationData | null) => {
      if (notification === null) {
        return
      }

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

  return {
    cachedNotifications,
    saveNotification,
    deleteNotificationById,
  }
}

export default useCachedNotifications
