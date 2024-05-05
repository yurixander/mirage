import {useMemo, type FC} from "react"
import {
  assert,
  type Credentials,
  getImageUrl,
  stringToColor,
  trim,
} from "../utils/util"
import IconButton from "./IconButton"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
  UserStatus,
} from "./UserProfile"
import {twMerge} from "tailwind-merge"
import useConnection from "@/hooks/matrix/useConnection"
import UserProfilePlaceholder from "./UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"

export type UserBarProps = {
  className?: string
}

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

const MAX_NAME_LENGTH = 18

const UserBar: FC<UserBarProps> = ({className}) => {
  const {client, isConnecting} = useConnection()

  const {cachedValue: credentials} = useLocalStorage<Credentials>(
    LocalStorageKeys.Credentials
  )

  const userData = useMemo(() => {
    if (client === null || !client.isLoggedIn() || credentials === null) {
      return
    }

    const user = client.getUser(credentials.userId)

    assert(
      user !== null,
      "Your same user should exist for there to be a session."
    )

    const avatarUrl = user.avatarUrl
    const displayName = user.displayName ?? credentials.userId

    const status = client.isLoggedIn()
      ? UserStatus.Online
      : isConnecting
        ? UserStatus.Idle
        : UserStatus.Offline

    const userBarProperties: UserProfileProperties = {
      avatarUrl: getImageUrl(avatarUrl, client, 48),
      displayName: trim(displayName, MAX_NAME_LENGTH),
      text: trim(getUsernameByUserId(credentials.userId), MAX_NAME_LENGTH),
      displayNameColor: stringToColor(credentials.userId),
      status,
    }

    return userBarProperties
  }, [client, credentials, isConnecting])

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
