import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type ServerListItemProps = {
  avatarUrl?: string
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
            "w-[8px] transition-all duration-300 ease-in-out -translate-x-[3px] group-active:h-2",
            isActive
              ? "h-6 animate-indicator bg-purple-500 rounded-xl"
              : "h-[8px] rounded-[50%]"
          )}
        />
      </div>

      <div
        tabIndex={!isActive ? 0 : undefined}
        className={twMerge(
          "relative overflow-hidden rounded-xl bg-red-500 ml-[5px] box-border cursor-pointer h-serverSize w-serverSize focus-visible:rounded-lg group-active:animate-hold group-active:transform group-active:scale-75",
          isActive
            ? "border-[3px] border-solid border-purple-500 box-border duration-200 transition shadow-serverSelected"
            : ""
        )}
        onClick={onClick}>
        {avatarImage}
      </div>
    </div>
  )
}

export default ServerListItem
