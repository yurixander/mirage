import {type FC} from "react"
import {twMerge} from "tailwind-merge"

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

  return (
    <div className={twMerge("flex flex-col gap-2 p-1", className)}>
      {ghosts.map((multiplier, index) => (
        <div
          key={index}
          style={{opacity: 1 - multiplier}}
          className="flex gap-1">
          <div className="relative size-9 overflow-hidden rounded-lg bg-neutral-300" />

          <div className="mr-auto inline-flex flex-col">
            <div className="overflow-hidden rounded-xl bg-neutral-300 text-profileGhost">
              Emerald branch
            </div>

            <div className="mt-1 max-h-3 w-min overflow-hidden rounded-xl bg-neutral-300 text-xs text-profileGhost">
              @emerald
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserProfileGhost
