import {useCallback, useEffect, useState} from "react"
import {create} from "zustand"

export type LocalNotificationData = {
  body: string
  isRead: boolean
  notificationId: string
  notificationTime: number
  senderName?: string
  avatarSenderUrl?: string
}

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "notifications"

type NotificationsState = {
  containsUnreadNotifications: boolean
  refreshContainsUnreadNotifications: (newValue: boolean) => void
}

export const useNotificationsStateStore = create<NotificationsState>(set => ({
  containsUnreadNotifications: false,
  refreshContainsUnreadNotifications: newValue => {
    set(_state => ({containsUnreadNotifications: newValue}))
  },
}))

const useCachedNotifications = () => {
  const {refreshContainsUnreadNotifications} = useNotificationsStateStore()

  const [cachedNotifications, setNotifications] = useState<
    LocalNotificationData[]
  >(() => {
    const savedNotifications = localStorage.getItem(
      NOTIFICATIONS_LOCAL_STORAGE_KEY
    )

    return savedNotifications ? JSON.parse(savedNotifications) : []
  })

  useEffect(() => {
    // Check if you have unread notifications with the `some` method and it will refresh the global status of notifications.
    refreshContainsUnreadNotifications(
      cachedNotifications.some(notification => !notification.isRead)
    )
  }, [cachedNotifications, refreshContainsUnreadNotifications])

  const markAsReadAllNotifications = useCallback(() => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notification => {
        return {
          ...notification,
          isRead: true,
        }
      })

      localStorage.setItem(
        NOTIFICATIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(updatedNotifications)
      )

      return updatedNotifications
    })
  }, [])

  const markAsReadByNotificationId = useCallback((notificationId: string) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notification => {
        if (notification.notificationId === notificationId) {
          return {
            ...notification,
            isRead: true,
          }
        }

        return notification
      })

      localStorage.setItem(
        NOTIFICATIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(updatedNotifications)
      )

      return updatedNotifications
    })
  }, [])

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
    markAsReadByNotificationId,
    markAsReadAllNotifications,
  }
}

export default useCachedNotifications
