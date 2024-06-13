import {type FC} from "react"
import {type InlineNotificationProps} from "./InlineNotification"

export type ActionNotificationProps = {
  onAccept: () => void
  onDismiss: () => void
} & InlineNotificationProps

const ActionNotification: FC<ActionNotificationProps> = ({
  isRead,
  roomName,
  sender,
  onAccept,
  onDismiss,
}) => {
  return <></>
}

export default ActionNotification
