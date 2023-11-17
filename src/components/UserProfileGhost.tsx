import "../styles/UserProfileGhost.sass"

export type UserProfileGhostProps = {
  count: number
  opacityMultiplier: number
}

export default function UserProfileGhost(props: UserProfileGhostProps) {
  const ghosts = []

  for (let x = 1; x <= props.count; x++)
    ghosts.push(x * props.opacityMultiplier)

  return (
    <div>
      {ghosts.map(multiplier =>
        <div style={{opacity: 1 - multiplier}} className="UserProfileGhost">
          <div className="avatar-wrapper-ghost">
            <div className="avatar-ghost">
            </div>
            <div className={"status"} />
          </div>
          <div className="info-ghost">
            <div className="display-name-ghost">Emerald branch</div>
            <div className="activity-ghost">@emerald</div>
          </div>
        </div>)}
    </div>
  )
}
