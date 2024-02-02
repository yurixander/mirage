/* eslint-disable tailwindcss/enforces-shorthand */
import {useMemo, type FC} from "react"

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
  const ghosts = useMemo(() => {
    const ghosts = []

    // REVISE: Simplify by using `Array.from` or `Array().fill`.
    for (let i = 1; i <= count; i++) ghosts.push(i * opacityMultiplier)

    return ghosts
  }, [])

  const containerTwClassName = className ?? "flex flex-col gap-3 p-1"

  return (
    <div className={containerTwClassName}>
      {ghosts.map((multiplier, index) => (
        <div
          key={index}
          style={{opacity: 1 - multiplier}}
          className="flex gap-1">
          <div className="relative">
            <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[10px] bg-neutral-300" />

            <div className="absolute bottom-0 right-0 h-[13px] w-[13px] translate-x-1/4 translate-y-1/4 rounded-[50%] border-[2px] border-solid border-neutral-50 bg-neutral-300" />
          </div>

          <div className="mr-auto inline-flex flex-col gap-1">
            <div className="overflow-hidden rounded-[10px] bg-neutral-300 text-base font-semibold text-profileGhost">
              Emerald branch
            </div>

            <div className="mt-1 h-3 w-min overflow-hidden rounded-[10px] bg-neutral-300 text-xs text-profileGhost">
              @emerald
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserProfileGhost
