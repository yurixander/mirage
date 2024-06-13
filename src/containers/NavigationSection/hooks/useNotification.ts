import {useState} from "react"

enum NotificationKind {
  ActionNotification,
  InlineNotification,
}

enum NotificationType {
  Banned,
  Leaved,
  Invited,
  UpgradeToAdmin,
  UpgradeToModerator,
  DowngradeToMember,
}

type ActionNotification = {
  onAccept: () => void
  onDismiss: () => void
} & InlineNotification

interface InlineNotification {
  notificationId: number
  isRead: boolean
  roomName: string
  sender: string
  type: NotificationType
}

type NotificationOf<Kind extends NotificationKind> =
  Kind extends NotificationKind.ActionNotification
    ? ActionNotification
    : InlineNotification

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
