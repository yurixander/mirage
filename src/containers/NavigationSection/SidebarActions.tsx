import Typography, {TypographyVariant} from "@/components/Typography"
import {assert} from "@/utils/util"
import {type FC} from "react"
import {type IconType} from "react-icons"
import {IoCall, IoExit, IoNotifications, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type SidebarActionsProps = {
  onNotification: () => void
  onDirectMessages: () => void
  onCalls: () => void
  onExit: () => void
  className?: string
}

const SidebarActions: FC<SidebarActionsProps> = ({
  className,
  onCalls,
  onDirectMessages,
  onExit,
  onNotification,
}) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <SidebarActionItem
        name="Direct Messages"
        icon={IoPaperPlane}
        onClick={onDirectMessages}
      />

      <SidebarActionItem
        name="Notifications"
        icon={IoNotifications}
        onClick={onNotification}
      />

      <SidebarActionItem name="Calls" icon={IoCall} onClick={onCalls} />

      <SidebarActionItem name="Exit" icon={IoExit} onClick={onExit} />
    </div>
  )
}

type SidebarActionItemProps = {
  icon: IconType
  name: string
  onClick: () => void
  unreadNotifications?: number
}

const SidebarActionItem: FC<SidebarActionItemProps> = ({
  icon,
  name,
  onClick,
  unreadNotifications,
}) => {
  const Icon = icon

  assert(
    unreadNotifications === undefined ||
      (unreadNotifications !== undefined && unreadNotifications > 0),
    "If there are unread notifications, they cannot be zero"
  )

  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-slate-200"
      onClick={onClick}
      role="button"
      aria-hidden="true">
      <Icon className="text-slate-400" />

      <Typography className="line-clamp-1 font-bold text-slate-600">
        {name}
      </Typography>

      {unreadNotifications !== undefined && (
        <div className="flex size-5 items-center justify-center rounded-full bg-red-500">
          <Typography
            variant={TypographyVariant.P}
            className="font-bold text-white">
            {unreadNotifications}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default SidebarActions
