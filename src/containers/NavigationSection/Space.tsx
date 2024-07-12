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
    <div
      onClick={onClick}
      aria-hidden
      className={twMerge(
        "box-border size-10 cursor-pointer overflow-hidden rounded-lg border-[3px] transition-colors",
        isSelected ? "border-purple-500" : "border-transparent",
        classNames
      )}>
      <Avatar square size={70} variant="bauhaus" />
    </div>
  )
}

export default Space
