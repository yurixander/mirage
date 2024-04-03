import {getNotificationsData} from "@/utils/notifications"
import {useEffect, useState} from "react"
import {create} from "zustand"

export type LocalNotificationData = {
  body: string
  isRead: boolean
  notificationId: string
  notificationTime: number
  senderName?: string
  avatarSenderUrl?: string
}

export enum NotificationsSyncState {
  Pending,
  Processed,
}

type NotificationsState = {
  state: NotificationsSyncState | null
  setNotificationsState: (state: NotificationsSyncState) => void
  containsUnreadNotifications: boolean
  refreshContainsUnreadNotifications: (newValue: boolean) => void
}

export const useNotificationsStateStore = create<NotificationsState>(set => ({
  state: null,
  containsUnreadNotifications: false,
  refreshContainsUnreadNotifications: newValue => {
    set(_state => ({containsUnreadNotifications: newValue}))
  },
  setNotificationsState: newState => {
    set(_state => ({
      state: newState,
      containsUnreadNotifications: newState === NotificationsSyncState.Pending,
    }))
  },
}))

const useCachedNotifications = () => {
  const {refreshContainsUnreadNotifications, state, setNotificationsState} =
    useNotificationsStateStore()

  const [cachedNotifications, setNotifications] = useState<
    LocalNotificationData[]
  >([])

  useEffect(() => {
    if (state === NotificationsSyncState.Processed) {
      return
    }

    setNotifications(getNotificationsData())
    setNotificationsState(NotificationsSyncState.Processed)
  }, [setNotificationsState, state])

  useEffect(() => {
    // Check if you have unread notifications with the `some` method and it will refresh the global status of notifications.
    refreshContainsUnreadNotifications(
      cachedNotifications.some(notification => !notification.isRead)
    )
  }, [cachedNotifications, refreshContainsUnreadNotifications])

  return {
    cachedNotifications,
  }
}

export default useCachedNotifications
