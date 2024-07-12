import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type SpaceProps = {
  isSelected: boolean
  spaceId: string
  onClick: () => void
  classNames?: string
}

const Space: FC<SpaceProps> = ({isSelected, onClick, classNames}) => {
  return (
    <div className="group flex items-center gap-1">
      <div
        className={twMerge(
          "-ml-0.5 h-6 w-1.5 rounded-full transition-[height] group-active:h-2",
          isSelected ? "bg-purple-500" : "bg-transparent"
        )}
      />

      <div
        onClick={onClick}
        aria-hidden
        className={twMerge(
          "group box-border size-10 cursor-pointer overflow-hidden rounded-lg border-[3px] transition-colors",
          isSelected ? "border-purple-500" : "border-transparent",
          classNames
        )}>
        <Avatar square size={70} variant="bauhaus" />
      </div>
    </div>
  )
}

export default Space
