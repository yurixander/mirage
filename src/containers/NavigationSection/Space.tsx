import Avatar from "boring-avatars"
import {useState, forwardRef} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {SCALE_IN_ANIM} from "@/utils/animations"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import MatrixImage from "@/components/MatrixImage"

export type SpaceProps = {
  isSelected: boolean
  spaceName: string
  spaceId: string
  onSpaceSelected: (spaceId: string) => void
  avatarUrl?: string
  classNames?: string
}

const Space = forwardRef<HTMLButtonElement, SpaceProps>(
  (
    {isSelected, onSpaceSelected, spaceName, spaceId, avatarUrl, classNames},
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              tabIndex={-1}
              className="flex items-center gap-0.5 sm:gap-1"
              onTapStart={() => setIsActive(true)}
              onTap={() => setIsActive(false)}
              onTapCancel={() => setIsActive(false)}>
              {isSelected ? (
                <motion.div
                  animate={{height: isActive ? 8 : 26}}
                  className={twMerge(
                    "-ml-0.5 w-1 rounded-full sm:w-1.5",
                    isSelected ? "bg-purple-500" : "bg-transparent"
                  )}
                />
              ) : (
                <div className="-ml-0.5 w-1 sm:w-1.5" />
              )}

              <motion.button
                ref={ref}
                aria-label={spaceName}
                variants={SCALE_IN_ANIM}
                initial="initial"
                whileInView="whileInView"
                whileTap={{scale: 0.9}}
                onClick={() => onSpaceSelected(spaceId)}
                transition={{
                  duration: 0.2,
                }}
                className={twMerge(
                  "box-border size-8 overflow-hidden rounded-md border-2 transition-colors focus-visible:ring sm:size-10 sm:rounded-lg sm:border-[3px]",
                  isSelected
                    ? "border-purple-500 shadow-md"
                    : "border-transparent",
                  classNames
                )}>
                {avatarUrl === undefined ? (
                  <Avatar
                    className="dark:opacity-90"
                    square
                    size="100%"
                    variant="bauhaus"
                  />
                ) : (
                  <MatrixImage
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
)

Space.displayName = "Space"

export default Space
