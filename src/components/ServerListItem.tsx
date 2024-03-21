import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./Avatar"

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
            "border-[3px] border-solid border-purple-500 shadow-serverSelected transition-transform duration-200"
        )}
        onClick={onClick}
        aria-hidden="true">
        <AvatarImage
          isRounded={false}
          isLarge={false}
          avatarType={AvatarType.Server}
          displayName="Margaret Sanger"
          avatarUrl={avatarUrl}
        />
      </div>
    </div>
  )
}

export default ServerListItem
