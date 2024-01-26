import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import "../styles/UserProfile.sass"
import {assert, trim, validateUrl} from "../util"
import Avatar from "boring-avatars"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"

export enum UserActivity {
  Listening = "Listening to",
}

export enum UserStatus {
  Online,
  Offline,
  Idle,
}

export type UserProfileProps = {
  avatarUrl?: string
  text: string
  displayName: string
  displayNameColor: string
  status: UserStatus
  activity?: UserActivity
  icon?: IconProp
  platform?: string
  isLarge?: boolean
}

const UserProfile: FC<UserProfileProps> = ({
  displayName,
  displayNameColor,
  status,
  text,
  activity,
  avatarUrl,
  icon,
  isLarge,
  platform,
}) => {
  assert(displayName.length > 0, "display name should not be empty")
  assert(
    text !== undefined && text.length > 0,
    "username should not be undefined or empty"
  )

  // TODO: check undefined values of the activity, platform and icon.
  if (icon !== undefined)
    assert(
      activity !== undefined || platform !== undefined,
      "User activity and platform should not be undefined"
    )
  else if (activity !== undefined)
    assert(
      icon !== undefined || platform !== undefined,
      "icon and platform should not be undefined or empty"
    )
  else if (platform !== undefined)
    assert(
      icon !== undefined || activity !== undefined,
      "icon and activity should not be undefined"
    )

  if (avatarUrl !== undefined)
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")

  const MAX_DISPLAY_NAME_LENGTH = 18
  let userStatusClassName: string

  switch (status) {
    case UserStatus.Online:
      userStatusClassName = "online"

      break
    case UserStatus.Offline:
      userStatusClassName = "offline"

      break
    case UserStatus.Idle:
      userStatusClassName = "idle"

      break
  }

  const avatarImage =
    avatarUrl !== undefined ? (
      <img src={avatarUrl} />
    ) : (
      <Avatar name={text} variant="beam" />
    )

  const activityOrText =
    activity !== undefined ? (
      <span className="activity-or-text">
        {activity + " "}
        <span className="platform">{platform}</span>
      </span>
    ) : (
      <span className="activity-or-text">{text}</span>
    )

  const isLargeClassName = isLarge !== undefined && isLarge ? "large" : ""

  return (
    <div className="UserProfile">
      <div className={"avatar-wrapper " + isLargeClassName}>
        <div className={"avatar"}>{avatarImage}</div>

        <div className={"status " + userStatusClassName} />
      </div>

      <div className="info">
        <div style={{color: displayNameColor}} className="display-name">
          {trim(displayName, MAX_DISPLAY_NAME_LENGTH)}
        </div>

        <div className="activity">
          {icon && <FontAwesomeIcon icon={icon} className="activity-icon" />}
          {activityOrText}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
