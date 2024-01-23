import {twMerge} from "tailwind-merge"
import "../styles/Avatar.sass"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

export default function Avatar(props: AvatarProps) {
  const roundedClass = props.isRounded ? "rounded" : ""

  return (
    <div key={props.displayName}>
      <img
        className={twMerge("image", roundedClass)}
        src={props.avatarUrl}
        alt={props.displayName}
      />
    </div>
  )
}
