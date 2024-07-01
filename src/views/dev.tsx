import {type NotificationProps} from "@/components/Notification"
import NotificationBoxPopup from "@/containers/NavigationSection/modals/NotificationBoxPopup"
import {NotificationType} from "@/utils/notifications"
import {type FC} from "react"

const notifications: NotificationProps[] = [
  {
    isRead: false,
    type: NotificationType.Invited,
    notificationId: "",
    roomName: "Design Utils",
    sender: "Emerald Branch",
    markAsRead() {},
    action() {},
    onDelete() {},
    notificationTime: Date.now(),
    roomId: "",
  },
  {
    isRead: true,
    type: NotificationType.Banned,
    notificationId: "",
    roomName: "Design Utils",
    sender: "Emerald Branch",
    markAsRead() {},
    onDelete() {},
    notificationTime: Date.now(),
    roomId: "",
  },
  {
    isRead: false,
    type: NotificationType.Invited,
    notificationId: "",
    roomName: "Force 4G LTE",
    sender: "Christopher",
    markAsRead() {},
    action() {},
    onDelete() {},
    notificationTime: Date.now(),
    roomId: "",
  },
]

const DevelopmentPreview: FC = () => {
  return (
    <>
      <NotificationBoxPopup
        notifications={[
          ...notifications,
          ...notifications,
          ...notifications,
          ...notifications,
        ]}
        isLoading={false}
        markAllNotificationsAsRead={function (): void {
          throw new Error("Function not implemented.")
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}

export default DevelopmentPreview
