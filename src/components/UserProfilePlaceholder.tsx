import "../styles/UserProfileGhost.sass"
import LoadingEffect from "./LoadingEffect"

const UserProfilePlaceholder = () => {
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
          <div className="display-name-ghost">
            Emerald branch
            <LoadingEffect />
          </div>
          <div className="activity-ghost">
            @emerald
            <LoadingEffect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePlaceholder
