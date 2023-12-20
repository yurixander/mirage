import "../styles/UserBar.sass"
import IconButton from "./IconButton"
import UserProfile, {type UserStatus} from "./UserProfile"
import {trim} from "../util"
import {faGear} from "@fortawesome/free-solid-svg-icons"

export type UserBarProps = {
  avatarUrl?: string
  username: string
  displayName: string
  displayNameColor: string
  status: UserStatus
}

export default function UserBar(props: UserBarProps) {
  const MAX_NAME_LENGTH = 18

  return (
    <section className="UserBar">
      <div className="profile-container">
        <UserProfile
          avatarUrl={props.avatarUrl}
          text={trim(props.username, MAX_NAME_LENGTH)}
          displayName={trim(props.displayName, MAX_NAME_LENGTH)}
          displayNameColor={props.displayNameColor}
          status={props.status}
          isLarge={false}
        />
      </div>
      {/* TODO: Handle click on settings button. */}
      <IconButton
        onClick={() => {}}
        icon={faGear}
        tooltip="Settings"
        tooltipPlacement="top"
      />
    </section>
  )
}
