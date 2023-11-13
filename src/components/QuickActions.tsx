import "../styles/QuickActions.sass"
import IconButton from "./IconButton"
import {ReactComponent as LogoutIcon} from "../../public/icons/logout.svg"
import {ReactComponent as NotificationIcon} from "../../public/icons/bell.svg"
import {ReactComponent as BoxIcon} from "../../public/icons/box.svg"
import {ReactComponent as PhoneIcon} from "../../public/icons/phone.svg"
import {ReactComponent as SendIcon} from "../../public/icons/dms.svg"

export type QuickActionsProps = {
  sendMessage: () => void,
  call: () => void,
  viewNotification: () => void,
  viewInbox: () => void,
  logout: () => void
}

export default function QuickActions(props: QuickActionsProps) {
  return (
    <div className="QuickActions">
      <IconButton onClick={props.sendMessage} tooltip="send" icon={SendIcon} />
      <IconButton onClick={props.call} tooltip="phone" icon={PhoneIcon} />
      <IconButton onClick={props.viewNotification} tooltip="viewNotification" icon={NotificationIcon} />
      <IconButton onClick={props.viewInbox} tooltip="viewInbox" icon={BoxIcon} />
      <IconButton onClick={props.logout} tooltip="logout" icon={LogoutIcon} />
    </div>
  )
}