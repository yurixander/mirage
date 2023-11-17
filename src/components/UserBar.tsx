import "../styles/UserBar.sass"
import {ReactComponent as SettingsIcon} from "../../public/icons/cog.svg"
import "../styles/UserBar.sass"
import IconButton from "./IconButton"
import UserProfile, {UserStatus} from "./UserProfile"
import {trim} from "../util"

export type UserBarProps = {
  avatarUrl?: string,
  username: string,
  displayName: string,
  displayNameColor: string,
  status: UserStatus
}

export default function UserBar(props: UserBarProps) {
  const MAX_NAME_LENGTH = 18

  return (
    <div className="UserBar">
      <UserProfile
        avatarUrl={props.avatarUrl}
        text={trim(props.username, MAX_NAME_LENGTH)}
        displayName={trim(props.displayName, MAX_NAME_LENGTH)}
        displayNameColor={props.displayNameColor}
        status={props.status}
        isLarge={false} />
      {/* TODO: Handle click on settings button. */}
      <IconButton
        onClick={() => { }}
        icon={SettingsIcon}
        tooltip="Settings"
        tooltipPlacement="top" />
    </div>
  )
}
