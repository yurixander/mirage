import useConnection from "@/hooks/matrix/useConnection"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"
import {
  assert,
  cleanDisplayName,
  type Credentials,
  getImageUrl,
  getUsernameByUserId,
} from "@/utils/util"
import {useMemo} from "react"

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

    const displayName =
      user.displayName ??
      getUsernameByUserId(credentials.userId).replace("@", "")

    return {
      userId: credentials.userId,
      displayName: cleanDisplayName(displayName),
      avatarUrl: getImageUrl(user.avatarUrl, client, 48),
    }
  }, [client, credentials])

  return {userData, isConnecting}
}

export default useUserData
