import {useState} from "react"

enum NotificationKind {
  ActionNotification,
  InlineNotification,
}

type ActionNotification = {
  roomName: string
}

type InlineNotification = {
  roomName: string
}

type NotificationOf<Kind extends NotificationKind> =
  Kind extends NotificationKind.ActionNotification
    ? ActionNotification
    : InlineNotification

type Notification<Kind extends NotificationKind> = {
  kind: Kind
  data: NotificationOf<Kind>
}

type AnyNotification =
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
  }
}

export default useNotification
