import {type NotificationProps} from "@/components/Notification"
import NotificationsTray from "@/containers/NavigationSection/NotificationsTray"
import {NotificationType} from "@/utils/notifications"
import {type FC} from "react"

const notification: NotificationProps = {
  isRead: false,
  notificationId: "notification1Id",
  notificationTime: Date.now(),
  roomId: "room1Id",
  roomName: "room1Name",
  type: NotificationType.UpgradeToAdmin,
  sender: "@criss",
  action() {},
  markAsRead(notificationId) {},
  onDelete(notificationId) {},
}

const DevelopmentPreview: FC = () => {
  return (
    <>
      <NotificationsTray
        isLoading={false}
        notifications={[
          notification,
          notification,
          notification,
          {...notification, isRead: true},
        ]}
      />
    </>
  )
}

export default DevelopmentPreview
