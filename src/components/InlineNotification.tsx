import {type NotificationType} from "@/containers/NavigationSection/hooks/useNotification"
import {type FC} from "react"

export interface InlineNotificationProps {
  type: NotificationType
  notificationId: number
  isRead: boolean
  roomName: string
  sender: string
  notificationTime: number
  senderAvatarUrl?: string
  onDelete: () => void
  markAsRead: () => void
}

const InlineNotification: FC<InlineNotificationProps> = ({
  isRead,
  roomName,
  sender,
}) => {
  return <></>
}

export default InlineNotification
