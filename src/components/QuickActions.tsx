import {
  faBell,
  faBox,
  faPaperPlane,
  faPhone,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"
import IconButton from "./IconButton"

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
    <section className="inline-flex flex-col gap-4">
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
        isDotVisible
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
