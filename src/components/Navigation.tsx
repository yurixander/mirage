import "../styles/Navigation.sass"
import {ReactComponent as AppLogo} from "../../public/logo.svg"
import Avatar from "boring-avatars"

export default function Navigation() {
  return (
    <div className="Navigation">
      <AppLogo onClick={() => {/* TODO: Handle click on logo. */}} />
      <div className="app-name">
        <div>Mirage</div>
        <span>©</span>
      </div>
      <div className="divider" />
      {/* TODO: Check server component. */}
      <div className="server">
        <div className="server-avatar">
          <Avatar name={"@emerald_branch"} variant="beam" />
        </div>
      </div>
    </div>
  )
}
