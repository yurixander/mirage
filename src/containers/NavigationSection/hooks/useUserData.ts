import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useLocalStorage, {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import {getImageUrl} from "@/utils/matrix"
import {cleanDisplayName, type Credentials} from "@/utils/util"
import {useCallback, useEffect, useState} from "react"

export enum UserDataState {
  Loading,
  Prepared,
  Error,
}

export type UserData = {
  displayName: string
  userId: string
  avatarImageUrl?: string
}

type UseUserDataReturnType = {
  userDataState: UserDataState
  userData: UserData
  onRefreshData: () => void
}

const useUserData = (): UseUserDataReturnType => {
  const client = useMatrixClient()
  const [userDataState, setUserDataState] = useState(UserDataState.Loading)

  const {value: credentials} = useLocalStorage<Credentials>(
    LocalStorageKey.Credentials
  )

  const [userData, setUserData] = useState<UserData>({
    displayName: "",
    userId: "",
  })

  const fetchUserData = useCallback(() => {
    if (client === null || credentials === null) {
      return
    }

    setUserDataState(UserDataState.Loading)

    void client
      .getProfileInfo(credentials.userId)
      .then(profileInfo => {
        setUserData({
          userId: credentials.userId,
          displayName: cleanDisplayName(
            profileInfo.displayname ?? credentials.userId
          ),
          avatarImageUrl: getImageUrl(profileInfo.avatar_url, client, 48),
        })

        setUserDataState(UserDataState.Prepared)
      })
      .catch(error => {
        console.error("Error getting profile,", error)

        setUserDataState(UserDataState.Error)
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

  return {
    userData,
    userDataState,
    onRefreshData: fetchUserData,
  }
}

export default useUserData
