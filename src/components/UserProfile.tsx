import "../styles/UserProfile.sass"
import {assert, trim, validateUrl} from "../util"
import Avatar from "boring-avatars"

export enum UserActivity {
  Listening = "Listening to"
}

export enum UserStatus {
  Online,
  Offline,
  Idle
}

export type UserProfileProps = {
  avatarUrl?: string,
  text: string,
  displayName: string,
  displayNameColor: string,
  status: UserStatus,
  activity?: UserActivity,
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  platform?: string,
  isLarge: boolean
}

export default function UserProfile(props: UserProfileProps) {
  assert(props.displayName.length > 0, "display name should not be empty")
  assert(props.text !== undefined && props.text.length > 0,
    "username should not be undefined or empty")

  // TODO: check undefined values of the activity, platform and icon.
  if (props.icon !== undefined)
    assert(
      props.activity !== undefined || props.platform !== undefined,
      "User activity and platform should not be undefined"
    )
  else if (props.activity !== undefined)
    assert(
      props.icon !== undefined || props.platform !== undefined,
      "icon and platform should not be undefined or empty"
    )
  else if (props.platform !== undefined)
    assert(
      props.icon !== undefined || props.activity !== undefined,
      "icon and activity should not be undefined"
    )

  if (props.avatarUrl !== undefined)
    assert(validateUrl(props.avatarUrl), "avatar URL should be valid if defined")

  const MAX_DISPLAY_NAME_LENGTH = 18
  let userStatusClassName: string

  switch (props.status) {
    case UserStatus.Online: userStatusClassName = "online"; break
    case UserStatus.Offline: userStatusClassName = "offline"; break
    case UserStatus.Idle: userStatusClassName = "idle"; break
  }

  const avatarImage = props.avatarUrl !== undefined
    ? <img src={props.avatarUrl} />
    : <Avatar name={props.text} variant="beam" />

  // TODO: Check font weight of platform text.
  const activityOrText = props.activity !== undefined
    ? <span className="activity-or-text">
      {props.activity + " "}
      <span className="platform">{props.platform}</span>
    </span>
    : <span className="activity-or-text">{props.text}</span>

  const isLargeClassName = props.isLarge ? "large" : ""

  return (
    <div className="UserProfile">
      <div className={"avatar-wrapper " + isLargeClassName}>
        <div className={"avatar"} >
          {avatarImage}
        </div>
        <div className={"status " + userStatusClassName} />
      </div>
      <div className="info">
        <div
          style={{color: props.displayNameColor}}
          className="display-name">{trim(props.displayName, MAX_DISPLAY_NAME_LENGTH)}
        </div>
        <div className="activity">
          {props.icon && <props.icon className="activity-icon" />}
          {activityOrText}
        </div>
      </div>
    </div>
  )
}
