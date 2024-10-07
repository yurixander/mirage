import Avatar from "boring-avatars"
import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {scaleInAnimation} from "@/utils/animations"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type SpaceProps = {
  isSelected: boolean
  spaceName: string
  spaceId: string
  onSpaceSelected: (spaceId: string) => void
  avatarUrl?: string
  classNames?: string
}

const Space: FC<SpaceProps> = ({
  isSelected,
  onSpaceSelected,
  spaceName,
  spaceId,
  avatarUrl,
  classNames,
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            aria-label={spaceName}
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
                aria-hidden
                animate={{height: isActive ? 8 : 26}}
                className={twMerge(
                  "-ml-0.5 w-1.5 rounded-full",
                  isSelected ? "bg-purple-500" : "bg-transparent"
                )}
              />
            ) : (
              <div aria-hidden className="-ml-0.5 w-1.5" />
            )}

            <motion.button
              aria-hidden
              variants={scaleInAnimation}
              initial="initial"
              whileInView="whileInView"
              whileTap={{scale: 0.9}}
              animate={{scale: isActive ? 0.9 : 1}}
              transition={{
                duration: 0.2,
              }}
              className={twMerge(
                "box-border size-10 cursor-pointer overflow-hidden rounded-lg border-[3px] transition-colors",
                isSelected
                  ? "border-purple-500 shadow-md"
                  : "border-transparent",
                classNames
              )}
              onClick={() => {
                onSpaceSelected(spaceId)
              }}>
              {avatarUrl === undefined ? (
                <Avatar
                  className="dark:opacity-90"
                  aria-hidden
                  square
                  size="100%"
                  variant="bauhaus"
                />
              ) : (
                <img
                  aria-hidden
                  className="size-full object-cover dark:opacity-90"
                  src={avatarUrl}
                  alt={`Avatar of ${spaceName}`}
                />
              )}
            </motion.button>
          </motion.div>
        </TooltipTrigger>

        <TooltipContent side="right">{spaceName}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Space
