import "../styles/UserProfilePlaceholder.sass"
import LoadingEffect from "./LoadingEffect"

export default function UserProfilePlaceholder() {
  return (
    <div>
      <div className="UserProfileGhost">
        <div className="avatar-wrapper-ghost">
          <div className="avatar-ghost">
            <LoadingEffect />
          </div>
          <div className={"status-ghost"} />
        </div>
        <div className="info-ghost">
          <div className="display-name-ghost">Emerald branch
            <LoadingEffect /></div>
          <div className="activity-ghost">@emerald
            <LoadingEffect /></div>
        </div>
      </div>
    </div>
  )
}
