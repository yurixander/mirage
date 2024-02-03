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
        icon={faPaperPlane}
      />

      <IconButton onClick={onViewCalls} tooltip="Calls" icon={faPhone} />

      <IconButton
        onClick={onViewNotifications}
        tooltip="Notifications"
        icon={faBell}
        isDotVisible
      />

      <IconButton
        onClick={onOpenExtensions}
        tooltip="Extensions"
        icon={faBox}
      />

      <IconButton
        onClick={onLogout}
        tooltip="Sign out"
        icon={faRightFromBracket}
      />
    </section>
  )
}

export default QuickActions
