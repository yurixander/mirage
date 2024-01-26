import {type FC} from "react"
import "../styles/Avatar.sass"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

const Avatar: FC<AvatarProps> = ({isRounded, displayName, avatarUrl}) => {
  const imageClassNames = `image ${isRounded ? "rounded" : ""}`
  return (
    <div className="Avatar" key={displayName}>
      <img className={imageClassNames} src={avatarUrl} alt={displayName} />
    </div>
  )
}

export default Avatar
