import {useState} from "react"

type LocalNotificationProps = {
  isRead: boolean
  eventId: string
}

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "notifications"

const useCachedNotifications = () => {
  const [notifications, setNotifications] = useState<LocalNotificationProps[]>(
    () => {
      const savedNotifications = localStorage.getItem(
        NOTIFICATIONS_LOCAL_STORAGE_KEY
      )

      return savedNotifications ? JSON.parse(savedNotifications) : []
    }
  )

  const saveNotification = (notification: LocalNotificationProps) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = [...prevNotifications, notification]

      localStorage.setItem(
        NOTIFICATIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(updatedNotifications)
      )

      return updatedNotifications
    })
  }

  return {notifications, saveNotification}
}

export default useCachedNotifications
