import {type NotificationType} from "@/containers/NavigationSection/hooks/useNotification"
import {type FC} from "react"

export interface InlineNotificationProps {
  notificationId: number
  isRead: boolean
  roomName: string
  sender: string
  type: NotificationType
}

const InlineNotification: FC<InlineNotificationProps> = ({
  isRead,
  roomName,
  sender,
}) => {
  return <></>
}

export default InlineNotification
