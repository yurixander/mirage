import {type FC} from "react"
import IconButton from "./IconButton"
import {twMerge} from "tailwind-merge"
import {
  IoPaperPlane,
  IoExtensionPuzzle,
  IoExit,
  IoNotificationsSharp,
} from "react-icons/io5"
import {IoMdCall} from "react-icons/io"

export type QuickActionsProps = {
  onViewDirectMessages: () => void
  onViewCalls: () => void
  onViewNotifications: () => void
  onOpenExtensions: () => void
  onLogout: () => void
  className?: string
}

const QuickActions: FC<QuickActionsProps> = ({
  onViewDirectMessages,
  onViewCalls,
  onViewNotifications,
  onOpenExtensions,
  onLogout,
  className,
}) => {
  return (
    <section className={twMerge("inline-flex flex-col gap-4", className)}>
      <IconButton
        onClick={onViewDirectMessages}
        tooltip="Direct messages"
        Icon={IoPaperPlane}
      />

      <IconButton onClick={onViewCalls} tooltip="Calls" Icon={IoMdCall} />

      <IconButton
        onClick={onViewNotifications}
        tooltip="Notifications"
        Icon={IoNotificationsSharp}
        isDotVisible
      />

      <IconButton
        onClick={onOpenExtensions}
        tooltip="Extensions"
        Icon={IoExtensionPuzzle}
      />

      <IconButton onClick={onLogout} tooltip="Sign out" Icon={IoExit} />
    </section>
  )
}

export default QuickActions
