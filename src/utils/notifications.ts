import {type LocalNotificationData} from "@/components/SidebarActions/useCachedNotifications"

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "notifications"

export function getNotificationsData(): LocalNotificationData[] {
  const savedNotifications = localStorage.getItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY
  )

  return savedNotifications ? JSON.parse(savedNotifications) : []
}

function setNotificationsData(notifications: LocalNotificationData[]) {
  localStorage.setItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}

export function saveNotification(notification: LocalNotificationData | null) {
  if (notification === null) {
    return
  }

  const savedNotifications = getNotificationsData()

  savedNotifications.push(notification)

  setNotificationsData(savedNotifications)
}

export function deleteNotificationById(notificationId: string) {
  const updatedNotifications = getNotificationsData().filter(
    notification => notification.notificationId !== notificationId
  )

  setNotificationsData(updatedNotifications)
}

export function markAllNotificationsAsRead() {
  const updatedNotifications = getNotificationsData().map(notification => {
    return {
      ...notification,
      isRead: true,
    }
  })

  setNotificationsData(updatedNotifications)
}

export function markAsReadByNotificationId(notificationId: string) {
  const updatedNotifications = getNotificationsData().map(notification => {
    if (notification.notificationId === notificationId) {
      return {
        ...notification,
        isRead: true,
      }
    }

    return notification
  })

  setNotificationsData(updatedNotifications)
}
