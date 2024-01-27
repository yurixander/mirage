import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

const Avatar: FC<AvatarProps> = ({isRounded, displayName, avatarUrl}) => {
  const isRoundedClass = isRounded && "rounded-[50%]"

  return (
    <div key={displayName}>
      <img
        className={twMerge("size-x2", isRoundedClass)}
        src={avatarUrl}
        alt={displayName}
      />
    </div>
  )
}

export default Avatar
