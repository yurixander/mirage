import {faGear} from "@fortawesome/free-solid-svg-icons"
import {useMemo, type FC} from "react"
import {trim} from "../utils/util"
import IconButton from "./IconButton"
import UserProfile, {UserStatus} from "./UserProfile"
import {twMerge} from "tailwind-merge"
import useConnection from "@/hooks/matrix/useConnection"

export type UserBarProps = {
  avatarUrl?: string
  username: string
  displayName: string
  displayNameColor: string
  status: UserStatus
  className?: string
}

const UserBar: FC<UserBarProps> = ({
  displayName,
  displayNameColor,
  username,
  avatarUrl,
  className,
}) => {
  const MAX_NAME_LENGTH = 18
  const {client, isConnecting} = useConnection()

  const status = useMemo(() => {
    if (isConnecting) {
      return UserStatus.Idle
    } else if (client?.isLoggedIn()) {
      return UserStatus.Online
    }

    return UserStatus.Offline
  }, [client, isConnecting])

  return (
    <div className={twMerge("flex p-[x1]", className)}>
      <div className="mr-auto">
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
      <IconButton onClick={() => {}} icon={faGear} tooltip="Settings" />
    </div>
  )
}

export default UserBar
