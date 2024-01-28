import Tippy from "@tippyjs/react"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type ServerListItemProps = {
  avatarUrl?: string
  isActive: boolean
  onClick: () => void
  tooltip: string
}

const ServerListItem: FC<ServerListItemProps> = ({
  avatarUrl,
  isActive,
  onClick,
  tooltip,
}) => {
  const avatarImage =
    avatarUrl !== undefined ? (
      <img
        className="absolute left-1/2 top-1/2 size-serverAvatarSize -translate-x-1/2 -translate-y-1/2"
        src={avatarUrl}
      />
    ) : (
      <Avatar size={50} square variant="bauhaus" name="Margaret Sanger" />
    )

  return (
    <div className="group flex items-center">
      <div className="flex h-auto w-2 flex-col justify-center overflow-hidden">
        <div
          className={twMerge(
            "w-indicatorSize transition-all duration-300 ease-in-out -translate-x-3px group-active:h-2",
            isActive
              ? "h-6 animate-indicator bg-primary rounded-10"
              : "h-indicatorSize rounded-50"
          )}
        />
      </div>

      <Tippy
        content={tooltip}
        arrow={true}
        inertia={true}
        animation="scale-subtle"
        duration={100}
        placement={"right"}>
        <div
          tabIndex={!isActive ? 0 : undefined}
          className={twMerge(
            "relative overflow-hidden rounded-10 bg-red ml-5px box-border cursor-pointer h-serverSize w-serverSize focus-visible:outline-2 focus-visible:outline-outlineTab focus-visible:outline-offset-2 focus-visible:rounded-5 group-active:animate-hold group-active:transform group-active:scale-75",
            isActive
              ? "border-3 border-solid border-primary box-border duration-200 transition shadow-serverSelected"
              : ""
          )}
          onClick={onClick}>
          {avatarImage}
        </div>
      </Tippy>
    </div>
  )
}

export default ServerListItem
