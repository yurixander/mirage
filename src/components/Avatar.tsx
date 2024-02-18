import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

const Avatar: FC<AvatarProps> = ({isRounded, displayName, avatarUrl}) => {
  return (
    <div>
      <img
        className={twMerge(
          "w-[30px] h-[30px]",
          isRounded && "rounded-[50%] object-contain"
        )}
        src={avatarUrl}
        alt={displayName}
      />
    </div>
  )
}

export default Avatar
