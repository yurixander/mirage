import {type FC} from "react"
import "../styles/QuickActions.sass"
import IconButton from "./IconButton"
import {
  faPaperPlane,
  faPhone,
  faBell,
  faBox,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

export type QuickActionsProps = {
  onViewDirectMessages: () => void
  onViewCalls: () => void
  onViewNotifications: () => void
  onOpenExtensions: () => void
  onLogout: () => void
}

const QuickActions: FC<QuickActionsProps> = ({
  onViewDirectMessages,
  onViewCalls,
  onViewNotifications,
  onOpenExtensions,
  onLogout,
}) => {
  return (
    <section className="QuickActions">
      <IconButton
        onClick={onViewDirectMessages}
        tooltip="Direct messages"
        tooltipPlacement="right"
        icon={faPaperPlane}
      />

      <IconButton
        onClick={onViewCalls}
        tooltip="Calls"
        tooltipPlacement="right"
        icon={faPhone}
      />

      <IconButton
        onClick={onViewNotifications}
        tooltip="Notifications"
        tooltipPlacement="right"
        icon={faBell}
        isDotShowed={true}
      />

      <IconButton
        onClick={onOpenExtensions}
        tooltip="Extensions"
        tooltipPlacement="right"
        icon={faBox}
      />

      <IconButton
        onClick={onLogout}
        tooltip="Sign out"
        tooltipPlacement="right"
        icon={faRightFromBracket}
      />
    </section>
  )
}

export default QuickActions
