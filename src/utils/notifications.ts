import {type AnyNotification} from "@/containers/NavigationSection/hooks/useNotification"

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "local_notifications"

export function getNotificationsData(): AnyNotification[] {
  const savedNotifications = localStorage.getItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY
  )

  return savedNotifications ? JSON.parse(savedNotifications) : []
}

export function setNotificationsData(notifications: AnyNotification[]) {
  localStorage.setItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}
