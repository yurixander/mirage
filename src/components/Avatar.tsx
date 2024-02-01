import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

const Avatar: FC<AvatarProps> = ({isRounded, displayName, avatarUrl}) => {
  return (
    <div key={displayName}>
      <img
        className={twMerge("w-x2 h-x2", isRounded && "rounded-50")}
        src={avatarUrl}
        alt={displayName}
      />
    </div>
  )
}

export default Avatar
