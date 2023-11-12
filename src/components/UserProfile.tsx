import "../styles/UserProfile.sass"
import {ReactComponent as SettingsIcon} from "../../public/icons/cog.svg"
import {assert, trim} from "../util"

export enum UserStatus {
    Online,
    Offline,
    Idle
}

export type UserProfileProps = {
    avatarUrl: string,
    username: string,
    displayName: string,
    displayNameColor: string,
    status: UserStatus
}

export default function UserProfile(props: UserProfileProps) {
  // TODO: Check if display name can be empty. If it cannot, then use an assert.

  assert(props.username.length > 0, "username should not be empty")

  const MAX_NAME_LENGTH = 18
  let userStatusClassName: string

  switch (props.status) {
    case UserStatus.Online: userStatusClassName = "online"; break
    case UserStatus.Offline: userStatusClassName = "offline"; break
    case UserStatus.Idle: userStatusClassName = "idle"; break
  }

  return (
    <div className="UserProfile">
      <div className="avatar">
        <div className={userStatusClassName} />
      </div>
      <div className="info">
        <div
          style={{color: props.displayNameColor}}
          className="display-name">{trim(props.displayName, MAX_NAME_LENGTH)}
        </div>
        <div className="username">{trim(props.username, MAX_NAME_LENGTH)}</div>
      </div>
      <SettingsIcon className="settings-icon" />
    </div>
  )
}

