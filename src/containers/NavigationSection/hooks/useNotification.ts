import {type ActionNotificationProps} from "@/components/ActionNotification"
import {type InlineNotificationProps} from "@/components/InlineNotification"
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
    setNotifications(prevNotification => [...prevNotification, notification])

    // TODO: Save in local storage.
  }

  return {
    notifications,
    saveNotification,
  }
}

export default useNotification
