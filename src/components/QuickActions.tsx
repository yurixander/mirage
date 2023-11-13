import "../styles/QuickActions.sass"
import IconButton from "./IconButton"
import {ReactComponent as LogoutIcon} from "../../public/icons/logout.svg"
import {ReactComponent as NotificationIcon} from "../../public/icons/bell.svg"
import {ReactComponent as BoxIcon} from "../../public/icons/box.svg"
import {ReactComponent as PhoneIcon} from "../../public/icons/phone.svg"
import {ReactComponent as SendIcon} from "../../public/icons/dms.svg"

export type QuickActionsProps = {
  onViewDirectMessages: () => void,
  onViewCalls: () => void,
  onViewNotifications: () => void,
  onOpenExtensions: () => void,
  onLogout: () => void
}

export default function QuickActions(props: QuickActionsProps) {
  return (
    <div className="QuickActions">
      <IconButton onClick={props.onViewDirectMessages} tooltip="Direct messages" icon={SendIcon} />
      <IconButton onClick={props.onViewCalls} tooltip="Calls" icon={PhoneIcon} />
      <IconButton onClick={props.onViewNotifications} tooltip="Notifications" icon={NotificationIcon} />
      <IconButton onClick={props.onOpenExtensions} tooltip="Extensions" icon={BoxIcon} />
      <IconButton onClick={props.onLogout} tooltip="Sign out" icon={LogoutIcon} />
    </div>
  )
}
