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

  const containerTwClassName = className ?? "flex flex-col gap-10px p-5px"

  return (
    <div className={containerTwClassName}>
      {ghosts.map((multiplier, index) => (
        <div
          key={index}
          style={{opacity: 1 - multiplier}}
          className="flex gap-5px">
          <div className="relative">
            <div className="relative h-avatarSize w-avatarSize overflow-hidden rounded-10 bg-contrastDarker"></div>

            <div
              className={
                "absolute bottom-0 right-0 h-statusSize w-statusSize translate-x-1/4 translate-y-1/4 rounded-50 border-2 border-solid border-contrast bg-contrastDarker"
              }
            />
          </div>

          <div className="mr-auto inline-flex flex-col gap-3px">
            <div className="overflow-hidden rounded-10 bg-contrastDarker text-large font-strong text-profileGhost">
              Emerald branch
            </div>

            <div className="mt-3px h-10px w-min overflow-hidden rounded-10 bg-contrastDarker text-xs text-profileGhost">
              @emerald
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserProfileGhost
