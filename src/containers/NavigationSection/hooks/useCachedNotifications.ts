import {type NotificationProps} from "@/components/Notification"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  getNotificationFromMembersEvent,
  getNotificationFromPowerLevelEvent,
  getNotificationsFromLocalStorage,
  setNotificationsToLocalStorage,
  type LocalNotificationData,
} from "@/utils/notifications"
import {RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useMemo, useState} from "react"

export enum NotificationType {
  Banned,
  Leaved,
  Invited,
  BanRemoved,
  RejectInvitation,
  UpgradeToAdmin,
  UpgradeToModerator,
  DowngradeToMember,
}

export const notificationsBody: {[key in NotificationType]: string} = {
  [NotificationType.Invited]: "has invited you to",
  [NotificationType.Banned]: "has banned you from",
  [NotificationType.Leaved]: "you have been kicked from",
  [NotificationType.RejectInvitation]: "you have rejected the invitation",
  [NotificationType.BanRemoved]: "your ban has been lifted in",
  [NotificationType.DowngradeToMember]: "you have been demoted to member in",
  [NotificationType.UpgradeToAdmin]: "you have been promoted to admin in",
  [NotificationType.UpgradeToModerator]:
    "you have been promoted to moderator in",
}

const useCachedNotifications = () => {
  const {client} = useConnection()
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const [cachedNotifications, setCachedNotifications] = useState<
    LocalNotificationData[]
  >(() => {
    // Initially fetch notifications from local storage.

    return getNotificationsFromLocalStorage()
  })

  const unreadNotifications = useMemo(() => {
    return cachedNotifications.filter(notification => !notification.isRead)
      .length
  }, [cachedNotifications])

  // #region Functions

  const saveNotification = useCallback(
    (notification: LocalNotificationData) => {
      setCachedNotifications(prevNotifications => {
        // Avoid saving a duplicate notification.
        const notificationsCleaned = prevNotifications.filter(
          prevNotification =>
            prevNotification.notificationId !== notification.notificationId
        )

        const newNotifications = [...notificationsCleaned, notification]
        setNotificationsToLocalStorage(newNotifications)

        return newNotifications
      })
    },
    []
  )

  const deleteNotificationById = useCallback((notificationId: string) => {
    setCachedNotifications(prevNotification => {
      const newNotifications = prevNotification.filter(
        notification => notification.notificationId !== notificationId
      )

      setNotificationsToLocalStorage(newNotifications)

      return newNotifications
    })
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setCachedNotifications(prevNotifications => {
      const newNotifications: LocalNotificationData[] = prevNotifications.map(
        prevNotification => {
          return {
            ...prevNotification,
            isRead: true,
          }
        }
      )

      setNotificationsToLocalStorage(newNotifications)

      return newNotifications
    })
  }, [])

  const markAsReadByNotificationId = useCallback((notificationId: string) => {
    setCachedNotifications(prevNotifications => {
      const newNotifications: LocalNotificationData[] = prevNotifications.map(
        prevNotification => {
          if (prevNotification.notificationId !== notificationId) {
            return prevNotification
          }

          return {
            ...prevNotification,
            isRead: true,
          }
        }
      )

      setNotificationsToLocalStorage(newNotifications)

      return newNotifications
    })
  }, [])

  // #region Converter

  useEffect(() => {
    // Convert local storage notifications to notifications for the component.

    setNotifications(
      cachedNotifications.map(notification => {
        if (notification.containsAction) {
          return {
            ...notification,
            onDelete: deleteNotificationById,
            markAsRead: markAsReadByNotificationId,
            action() {},
          }
        }

        return {
          ...notification,
          onDelete: deleteNotificationById,
          markAsRead: markAsReadByNotificationId,
        }
      })
    )
  }, [cachedNotifications, deleteNotificationById, markAsReadByNotificationId])

  // #region Listeners

  useEventListener(
    RoomMemberEvent.Membership,
    (event, member, oldMembership) => {
      if (client === null || member.userId !== client.getUserId()) {
        return
      }

      const notificationData = getNotificationFromMembersEvent(
        event,
        client,
        member,
        oldMembership
      )

      if (notificationData === null) {
        return
      }

      saveNotification(notificationData)
    }
  )

  useEventListener(RoomMemberEvent.PowerLevel, (event, member) => {
    if (client === null || member.userId !== client.getUserId()) {
      return
    }

    const notificationData = getNotificationFromPowerLevelEvent(
      client,
      event,
      member.powerLevel,
      member.userId
    )

    if (notificationData === null) {
      return
    }

    saveNotification(notificationData)
  })

  return {
    notifications,
    saveNotification,
    deleteNotificationById,
    markAllNotificationsAsRead,
    markAsReadByNotificationId,
    unreadNotifications,
  }
}

export default useCachedNotifications
