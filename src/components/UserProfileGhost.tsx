import "../styles/UserProfileGhost.sass"

export type UserProfileGhostProps = {
  count: number
  opacityMultiplier: number
}

export default function UserProfileGhost(props: UserProfileGhostProps) {
  const ghosts = []

  for (let i = 1; i <= props.count; i++)
    ghosts.push(i * props.opacityMultiplier)

  return (
    <div className="user-ghost-container">
      {ghosts.map((multiplier, index) => (
        <div
          key={index}
          style={{opacity: 1 - multiplier}}
          className="UserProfileGhost">
          <div className="avatar-wrapper-ghost">
            <div className="avatar-ghost"></div>
            <div className={"status-ghost"} />
          </div>
          <div className="info-ghost">
            <div className="display-name-ghost">Emerald branch</div>
            <div className="activity-ghost">@emerald</div>
          </div>
        </div>
      ))}
    </div>
  )
}
