import {getNotificationsData} from "@/containers/SidebarActions/hooks/notifications"
import {useEffect, useState} from "react"
import {create} from "zustand"

export type LocalNotificationData = {
  body: string
  isRead: boolean
  notificationId: string
  notificationTime: number
  senderName?: string
  avatarSenderUrl?: string
  hasActions?: boolean
}

export enum NotificationsSyncState {
  Pending,
  Processed,
}

type NotificationsState = {
  state: NotificationsSyncState | null
  setNotificationsState: (state: NotificationsSyncState) => void
  onRequestChanges: () => void
}

export const useNotificationsStateStore = create<NotificationsState>(set => ({
  state: null,
  setNotificationsState: newState => {
    set(_state => ({
      state: newState,
    }))
  },
  onRequestChanges: () => {
    set(_state => ({
      state: NotificationsSyncState.Pending,
    }))
  },
}))

const useCachedNotifications = () => {
  const {state, setNotificationsState} = useNotificationsStateStore()

  const [notifications, setNotifications] = useState<LocalNotificationData[]>(
    []
  )

  useEffect(() => {
    if (
      state === NotificationsSyncState.Processed &&
      notifications.length > 0
    ) {
      return
    }

    setNotifications(getNotificationsData())
    setNotificationsState(NotificationsSyncState.Processed)
  }, [notifications.length, setNotificationsState, state])

  return {
    notifications,
  }
}

export default useCachedNotifications
