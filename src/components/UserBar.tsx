import IconButton from "./IconButton"
import UserProfile, {type UserStatus} from "./UserProfile"
import {trim} from "../util"
import {faGear} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"

export type UserBarProps = {
  avatarUrl?: string
  username: string
  displayName: string
  displayNameColor: string
  status: UserStatus
}

const UserBar: FC<UserBarProps> = ({
  displayName,
  displayNameColor,
  status,
  username,
  avatarUrl,
}) => {
  const MAX_NAME_LENGTH = 18

  return (
    <section className="flex gap-5px p-x1">
      <div className="m-auto">
        <UserProfile
          avatarUrl={avatarUrl}
          text={trim(username, MAX_NAME_LENGTH)}
          displayName={trim(displayName, MAX_NAME_LENGTH)}
          displayNameColor={displayNameColor}
          status={status}
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

export default UserBar
