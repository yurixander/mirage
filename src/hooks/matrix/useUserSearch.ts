import {type UserProfileProps} from "@/components/UserProfile"
import {stringToColor} from "@/utils/util"
import {useState, useEffect} from "react"
import {type MatrixClient} from "matrix-js-sdk"

const LIMIT_USER_SEARCH = 100

const useUsersSearch = (client: MatrixClient | null, searchDelay = 500) => {
  const [query, setQuery] = useState("")
  const [results, setResult] = useState<UserProfileProps[] | null>(null)

  useEffect(() => {
    const search = async () => {
      if (query.length <= 0 || client === null) {
        setResult(null)

        return
      }

      const response = await client.searchUserDirectory({
        term: query,
        limit: LIMIT_USER_SEARCH,
      })

      setResult(
        response.results.map(userResult => ({
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
  }, [query, client, searchDelay])

  return {query, setQuery, results}
}

export default useUsersSearch
