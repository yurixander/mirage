import "../styles/QuickActions.sass"
import IconButton from "./IconButton"
import {faPaperPlane, faPhone, faBell, faBox, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

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
      <IconButton
        onClick={props.onViewDirectMessages}
        tooltip="Direct messages"
        tooltipPlacement="right"
        icon={faPaperPlane} />
      <IconButton
        onClick={props.onViewCalls}
        tooltip="Calls"
        tooltipPlacement="right"
        icon={faPhone} />
      <IconButton
        onClick={props.onViewNotifications}
        tooltip="Notifications"
        tooltipPlacement="right"
        icon={faBell} />
      <IconButton
        onClick={props.onOpenExtensions}
        tooltip="Extensions"
        tooltipPlacement="right"
        icon={faBox} />
      <IconButton
        onClick={props.onLogout}
        tooltip="Sign out"
        tooltipPlacement="right"
        icon={faRightFromBracket} />
    </div>
  )
}
