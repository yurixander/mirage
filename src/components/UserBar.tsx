import {faGear} from "@fortawesome/free-solid-svg-icons"
import {useMemo, type FC} from "react"
import {getImageUrl, trim} from "../utils/util"
import IconButton from "./IconButton"
import UserProfile, {type UserProfileProps as UserProfileProperties, UserStatus} from "./UserProfile"
import {twMerge} from "tailwind-merge"
import useConnection from "@/hooks/matrix/useConnection"
import UserProfilePlaceholder from "./UserProfilePlaceholder"

export type UserBarProps = {
  className?: string
}

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

const UserBar: FC<UserBarProps> = ({className}) => {
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

  const userData = useMemo(() => {
    const userID = client?.getUserId() ?? null

    if (userID === null || client === null) {
      return
    }

    const user = client?.getUser(userID)
    const avatarUrl = user?.avatarUrl

    if (avatarUrl === undefined) {
      return
    }

    const imgUrl = getImageUrl(avatarUrl, client)
    const displayName = user?.displayName ?? userID

    const userBarProperties: UserProfileProperties = {
      avatarUrl: imgUrl,
      displayName: trim(displayName, MAX_NAME_LENGTH),
      text: trim(getUsernameByUserId(userID), MAX_NAME_LENGTH),
      // TODO: Calculate color from the user's id.
      displayNameColor: "",
      status,
    }

    return userBarProperties
  }, [client, status])

  return (
    <div className={twMerge("flex p-[x1]", className)}>
      <div className="mr-auto">
        {userData ? (
          <UserProfile {...userData} isLarge={false} />
        ) : (
          <UserProfilePlaceholder />
        )}
      </div>

      {/* TODO: Handle click on settings button. */}
      <IconButton onClick={() => {}} icon={faGear} tooltip="Settings" />
    </div>
  )
}

export default UserBar
