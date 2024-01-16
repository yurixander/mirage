import "../styles/Avatar.sass"

export type AvatarProps = {
  isRounded: boolean
  displayName: string
  avatarUrl?: string
}

export default function Avatar(props: AvatarProps) {
  const imageClassNames = `image ${props.isRounded ? "rounded" : ""}`
  return (
    <div className="" key={props.displayName}>
      <img
        className={imageClassNames}
        src={props.avatarUrl}
        alt={props.displayName}
      />
    </div>
  )
}
