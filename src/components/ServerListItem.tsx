import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type ServerListItemProps = {
  avatarUrl: string | null
  isActive: boolean
  tooltip: string
  onClick: () => void
}

const ServerListItem: FC<ServerListItemProps> = ({
  avatarUrl,
  isActive,
  onClick,
  tooltip,
}) => {
  const avatarImage =
    avatarUrl === null ? (
      <Avatar size={47} square variant="bauhaus" name="Margaret Sanger" />
    ) : (
      <img
        className="absolute left-1/2 top-1/2 size-serverAvatarSize -translate-x-1/2 -translate-y-1/2"
        src={avatarUrl}
        alt="Server avatar"
      />
    )

  return (
    <div className="group flex items-center">
      <div className="flex h-auto w-2 flex-col justify-center overflow-hidden">
        <div
          className={twMerge(
            "w-[8px] -translate-x-[3px] transition-all duration-300 ease-in-out group-active:h-2",
            isActive
              ? "h-6 animate-indicator rounded-xl bg-purple-500"
              : "h-[8px] rounded-[50%]"
          )}
        />
      </div>

      <div
        tabIndex={isActive ? undefined : 0}
        className={twMerge(
          "relative ml-1 box-border size-serverSize cursor-pointer overflow-hidden rounded-xl bg-red-500 focus-visible:rounded-lg group-active:scale-75 group-active:transform group-active:animate-hold",
          isActive &&
            "border-[3px] border-solid border-purple-500 shadow-serverSelected transition duration-200"
        )}
        onClick={onClick}
        aria-hidden="true">
        {avatarImage}
      </div>
    </div>
  )
}

export default ServerListItem
