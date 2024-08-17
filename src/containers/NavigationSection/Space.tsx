import Avatar from "boring-avatars"
import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

export type SpaceProps = {
  isSelected: boolean
  spaceId: string
  onSpaceSelected: (spaceId: string) => void
  avatarUrl?: string
  classNames?: string
}

const Space: FC<SpaceProps> = ({
  isSelected,
  onSpaceSelected,
  spaceId,
  avatarUrl,
  classNames,
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <motion.div
      className="flex items-center gap-1"
      onTapStart={() => {
        setIsActive(true)
      }}
      onTap={() => {
        setIsActive(false)
      }}
      onTapCancel={() => {
        setIsActive(false)
      }}>
      {isSelected ? (
        <motion.div
          animate={{height: isActive ? 8 : 26}}
          className={twMerge(
            "-ml-0.5 w-1.5 rounded-full",
            isSelected ? "bg-purple-500" : "bg-transparent"
          )}
        />
      ) : (
        <div className="-ml-0.5 w-1.5" />
      )}

      <motion.button
        animate={{scale: isActive ? 0.9 : 1}}
        className={twMerge(
          "box-border size-10 cursor-pointer overflow-hidden rounded-lg border-[3px] transition-colors",
          isSelected ? "border-purple-500 shadow-md" : "border-transparent",
          classNames
        )}
        onClick={() => {
          onSpaceSelected(spaceId)
        }}>
        {avatarUrl === undefined ? (
          <Avatar square size="100%" variant="bauhaus" />
        ) : (
          <img
            className="size-full object-cover"
            src={avatarUrl}
            alt={spaceId}
          />
        )}
      </motion.button>
    </motion.div>
  )
}

export default Space
