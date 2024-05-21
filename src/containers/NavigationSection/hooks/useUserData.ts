import useConnection from "@/hooks/matrix/useConnection"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"
import {
  assert,
  cleanDisplayName,
  type Credentials,
  getImageUrl,
  getUsernameByUserId,
  trim,
} from "@/utils/util"
import {useMemo} from "react"

const MAX_NAME_LENGTH = 18

export type UserData = {
  displayName: string
  userId: string
  avatarUrl?: string
}

const useUserData = () => {
  const {client, isConnecting} = useConnection()

  const {cachedValue: credentials} = useLocalStorage<Credentials>(
    LocalStorageKeys.Credentials
  )

  const userData: UserData | undefined = useMemo(() => {
    if (client === null || !client.isLoggedIn() || credentials === null) {
      return
    }

    const user = client.getUser(credentials.userId)

    assert(
      user !== null,
      "Your same user should exist for there to be a session."
    )

    const avatarUrl = user.avatarUrl
    const displayName =
      user.displayName ??
      getUsernameByUserId(credentials.userId).replace("@", "")

    return {
      userId: credentials.userId,
      displayName: trim(cleanDisplayName(displayName), MAX_NAME_LENGTH),
      avatarUrl: getImageUrl(avatarUrl, client, 48),
    }
  }, [client, credentials])

  return {userData, isConnecting}
}

export default useUserData
