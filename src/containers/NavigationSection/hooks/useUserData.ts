import useConnection from "@/hooks/matrix/useConnection"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"
import {
  assert,
  cleanDisplayName,
  type Credentials,
  getImageUrl,
} from "@/utils/util"
import {useCallback, useEffect, useState} from "react"

export type UserData = {
  displayName: string
  userId: string
  avatarUrl?: string
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData>()
  const {client, isConnecting} = useConnection()

  const {cachedValue: credentials} = useLocalStorage<Credentials>(
    LocalStorageKeys.Credentials
  )

  const fetchUserData = useCallback(() => {
    if (client === null || !client.isLoggedIn() || credentials === null) {
      return
    }

    const user = client.getUser(credentials.userId)

    assert(
      user !== null,
      "Your same user should exist for there to be a session."
    )

    const displayName = user.displayName

    if (displayName === undefined) {
      // When connection is lost displayName is undefined.
      return
    }

    setUserData({
      userId: credentials.userId,
      displayName: cleanDisplayName(displayName),
      avatarUrl: getImageUrl(user.avatarUrl, client, 48),
    })
  }, [client, credentials])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUserData()
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchUserData])

  return {userData, isConnecting}
}

export default useUserData
