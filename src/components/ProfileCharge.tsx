import "../styles/ProfileCharge.sass"
import WaveCharge from "./WaveCharge"

export default function ProfileCharge() {
  return (
    <div>
      <div className="UserProfileGhost">
        <div className="avatar-wrapper-ghost">
          <div className="avatar-ghost">
            <WaveCharge />
          </div>
          <div className={"status"} />
        </div>
        <div className="info-ghost">
          <div className="display-name-ghost">Emerald branch
            <WaveCharge /></div>
          <div className="activity-ghost">@emerald
            <WaveCharge /></div>
        </div>
      </div>
    </div>
  )
}
