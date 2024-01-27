import {type FC} from "react"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

const Avatar: FC<AvatarProps> = ({isRounded, displayName, avatarUrl}) => {
  const imageClassNames = `size-x2 ${isRounded ? "rounded-[50%]" : ""}`

  return (
    <div key={displayName}>
      <img className={imageClassNames} src={avatarUrl} alt={displayName} />
    </div>
  )
}

export default Avatar
