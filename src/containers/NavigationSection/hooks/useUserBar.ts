import {type UserProfileProps, UserStatus} from "@/components/UserProfile"
import useConnection from "@/hooks/matrix/useConnection"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"
import {
  assert,
  type Credentials,
  getImageUrl,
  stringToColor,
  trim,
} from "@/utils/util"
import {useMemo} from "react"

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

const MAX_NAME_LENGTH = 18

const useUserBar = () => {
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

    const userBarProperties: UserProfileProps = {
      avatarUrl: getImageUrl(avatarUrl, client, 48),
      displayName: trim(displayName, MAX_NAME_LENGTH),
      text: trim(getUsernameByUserId(credentials.userId), MAX_NAME_LENGTH),
      displayNameColor: stringToColor(credentials.userId),
      status,
    }

    return userBarProperties
  }, [client, credentials, isConnecting])

  return {userData}
}

export default useUserBar
