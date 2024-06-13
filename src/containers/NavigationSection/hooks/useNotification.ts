import {type ActionNotificationProps} from "@/components/ActionNotification"
import {type InlineNotificationProps} from "@/components/InlineNotification"
import {setNotificationsData} from "@/utils/notifications"
import {useState} from "react"

export enum NotificationKind {
  ActionNotification,
  InlineNotification,
}

export enum NotificationType {
  Banned,
  Leaved,
  Invited,
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

const useNotification = () => {
  const [notifications, setNotifications] = useState<AnyNotification[]>([])

  const saveNotification = (notification: AnyNotification) => {
    setNotifications(prevNotifications => {
      const notificationsCleaned = prevNotifications.filter(
        prevNotification =>
          prevNotification.data.notificationId ===
          notification.data.notificationId
      )

      const newNotifications = [...notificationsCleaned, notification]
      setNotificationsData(newNotifications)

      return newNotifications
    })
  }

  const deleteNotificationById = (notificationId: string) => {
    setNotifications(prevNotification => {
      const newNotifications = prevNotification.filter(
        notification => notification.data.notificationId !== notificationId
      )

      setNotificationsData(newNotifications)

      return newNotifications
    })
  }

  return {
    notifications,
    saveNotification,
    deleteNotificationById,
  }
}

export default useNotification
