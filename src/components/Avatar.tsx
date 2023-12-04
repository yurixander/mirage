import "../styles/Avatar.sass"

export type AvatarProps = {
  isRounded: boolean,
  displayName: string,
  avatarUrl?: string
}

export default function Avatar(props: AvatarProps) {
  const imageClassNames = ["image"]

  if (props.isRounded)
    imageClassNames.push("rounded")

  return (
    <div className="Avatar" key={props.displayName}>
      <img className={imageClassNames.join(" ")} src={props.avatarUrl} />
    </div>
  )
}
