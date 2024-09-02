import {assert} from "@/utils/util"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

export type UserProfileGhostProps = {
  count: number
  opacityMultiplier: number
  className?: string
}

const UserProfileGhost: FC<UserProfileGhostProps> = ({
  count,
  opacityMultiplier,
  className,
}) => {
  const ghosts = Array.from(
    {length: count},
    (_, num) => num * opacityMultiplier
  )

  assert(count > 0, "User profile ghost count should not be zero.")

  return (
    <div className={twMerge("flex flex-col gap-2 p-1", className)}>
      {ghosts.map((multiplier, index) => (
        <motion.div
          initial={{scale: 0.5}}
          animate={{scale: 1}}
          key={index}
          style={{opacity: 1 - multiplier}}
          className="flex gap-1">
          <div className="relative size-9 overflow-hidden rounded-lg bg-neutral-300" />

          <div className="mr-auto inline-flex flex-col">
            <div className="text-profileGhost overflow-hidden rounded-xl bg-neutral-300">
              Emerald branch
            </div>

            <div className="text-profileGhost mt-1 max-h-3 w-min overflow-hidden rounded-xl bg-neutral-300 text-xs">
              @emerald
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default UserProfileGhost
