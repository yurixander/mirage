import {useMemo, type FC} from "react"
import {getImageUrl, stringToColor, trim} from "../utils/util"
import IconButton from "./IconButton"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
  UserStatus,
} from "./UserProfile"
import {twMerge} from "tailwind-merge"
import useConnection from "@/hooks/matrix/useConnection"
import UserProfilePlaceholder from "./UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"

export type UserBarProps = {
  className?: string
}

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

const UserBar: FC<UserBarProps> = ({className}) => {
  const MAX_NAME_LENGTH = 18
  const {client, isConnecting} = useConnection()

  const userData = useMemo(() => {
    const userId = client?.getUserId() ?? null

    if (userId === null || client === null) {
      return
    }

    const user = client?.getUser(userId)
    const avatarUrl = user?.avatarUrl

    const status = client.isLoggedIn()
      ? UserStatus.Online
      : isConnecting
        ? UserStatus.Idle
        : UserStatus.Offline

    if (avatarUrl === undefined) {
      return
    }

    const imgUrl = getImageUrl(avatarUrl, client)
    const displayName = user?.displayName ?? userId

    const userBarProperties: UserProfileProperties = {
      avatarUrl: imgUrl,
      displayName: trim(displayName, MAX_NAME_LENGTH),
      text: trim(getUsernameByUserId(userId), MAX_NAME_LENGTH),
      displayNameColor: stringToColor(userId),
      status,
    }

    return userBarProperties
  }, [client, isConnecting])

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
      <IconButton onClick={() => {}} Icon={IoMdSettings} tooltip="Settings" />
    </div>
  )
}

export default UserBar
