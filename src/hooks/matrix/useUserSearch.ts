import {type UserProfileProps} from "@/components/UserProfile"
import {stringToColor} from "@/utils/util"
import {useState, useEffect} from "react"
import {type MatrixClient} from "matrix-js-sdk"

const LIMIT_USER_SEARCH = 100

const useUsersSearch = (client: MatrixClient | null, searchDelay = 500) => {
  const [userToFind, setUserToFind] = useState("")

  const [usersResult, setUsersResult] = useState<UserProfileProps[] | null>(
    null
  )

  useEffect(() => {
    const search = async () => {
      if (userToFind.length <= 0) {
        setUsersResult(null)
        return
      }

      const results = await client?.searchUserDirectory({
        term: userToFind,
        limit: LIMIT_USER_SEARCH,
      })

      if (results === undefined) {
        return
      }

      setUsersResult(
        results.results.map(userResult => ({
          displayName: userResult.display_name ?? userResult.user_id,
          text: userResult.user_id,
          displayNameColor: stringToColor(userResult.user_id),
        }))
      )
    }

    const timerId = setTimeout(() => {
      void search()
    }, searchDelay)

    return () => {
      clearTimeout(timerId)
    }
  }, [userToFind, client, searchDelay])

  return {userToFind, setUserToFind, usersResult}
}

export default useUsersSearch
