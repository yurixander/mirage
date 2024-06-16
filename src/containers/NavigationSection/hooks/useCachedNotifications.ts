import {type ActionNotificationProps} from "@/components/ActionNotification"
import {type InlineNotificationProps} from "@/components/InlineNotification"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  getLocalNotificationsData,
  getNotificationFromMembersEvent,
  type LocalNotificationData,
  setLocalNotificationsData,
} from "@/utils/notifications"
import {RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useMemo, useState} from "react"

export enum NotificationKind {
  ActionNotification,
  InlineNotification,
}

export enum NotificationType {
  Banned,
  Leaved,
  Invited,
  RejectInvitation,
  UpgradeToAdmin,
  UpgradeToModerator,
  DowngradeToMember,
}

// TODO: Convert to english.
export const notificationsBody: {[key in NotificationType]: string} = {
  [NotificationType.Invited]: "te ha invitado a",
  [NotificationType.Banned]: "te ha baneado de",
  [NotificationType.Leaved]: "",
  [NotificationType.UpgradeToAdmin]: "",
  [NotificationType.UpgradeToModerator]: "",
  [NotificationType.DowngradeToMember]: "",
  [NotificationType.RejectInvitation]: "",
}

type NotificationOf<Kind extends NotificationKind> =
  Kind extends NotificationKind.ActionNotification
    ? ActionNotificationProps
    : InlineNotificationProps

type Notification<Kind extends NotificationKind> = {
  kind: Kind
  data: NotificationOf<Kind>
}

export type AnyNotification =
  | Notification<NotificationKind.ActionNotification>
  | Notification<NotificationKind.InlineNotification>

const useCachedNotifications = () => {
  const {client} = useConnection()
  const [notifications, setNotifications] = useState<AnyNotification[]>([])

  const [cachedNotifications, setCachedNotifications] = useState<
    LocalNotificationData[]
  >(() => {
    // Initially fetch notifications from local storage.

    return getLocalNotificationsData()
  })

  const unreadNotifications = useMemo(() => {
    return cachedNotifications.filter(notification => !notification.isRead)
      .length
  }, [cachedNotifications])

  const saveNotification = useCallback(
    (notification: LocalNotificationData) => {
      setCachedNotifications(prevNotifications => {
        const notificationsCleaned = prevNotifications.filter(
          prevNotification =>
            prevNotification.notificationId !== notification.notificationId
        )

        const newNotifications = [...notificationsCleaned, notification]
        setLocalNotificationsData(newNotifications)

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

      setLocalNotificationsData(newNotifications)

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

      setLocalNotificationsData(newNotifications)

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

      setLocalNotificationsData(newNotifications)

      return newNotifications
    })
  }, [])

  // #region Converter

  useEffect(() => {
    // Convert local storage notifications to notifications for the component.

    setNotifications(
      cachedNotifications.map(notification => {
        if (
          notification.notificationKind === NotificationKind.InlineNotification
        ) {
          return {
            kind: notification.notificationKind,
            data: {
              ...notification,
              markAsRead() {
                markAsReadByNotificationId(notification.notificationId)
              },
              onDelete() {
                deleteNotificationById(notification.notificationId)
              },
            },
          }
        }

        return {
          kind: NotificationKind.ActionNotification,
          data: {
            ...notification,
            onAction() {},
            markAsRead() {
              markAsReadByNotificationId(notification.notificationId)
            },
            onDelete() {
              deleteNotificationById(notification.notificationId)
            },
          },
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
