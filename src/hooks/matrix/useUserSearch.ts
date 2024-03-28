import {type UserProfileProps} from "@/components/UserProfile"
import {stringToColor} from "@/utils/util"
import {useState, useEffect} from "react"
import {type MatrixClient} from "matrix-js-sdk"
import useDebounced from "../util/useDebounced"

const LIMIT_USER_SEARCH = 100

const useUsersSearch = (client: MatrixClient | null, searchDelay = 500) => {
  const [query, setQuery] = useState("")
  const [results, setResult] = useState<UserProfileProps[] | null>(null)
  const debouncedText = useDebounced(query, 500)

  useEffect(() => {
    const search = async () => {
      if (debouncedText.length <= 0 || client === null) {
        setResult(null)

        return
      }

      try {
        const response = await client.searchUserDirectory({
          term: debouncedText,
          limit: LIMIT_USER_SEARCH,
        })

        setResult(
          response.results.map(userResult => ({
            displayName: userResult.display_name ?? userResult.user_id,
            text: userResult.user_id,
            displayNameColor: stringToColor(userResult.user_id),
          }))
        )
      } catch (error) {
        console.error("Error during user search:", error)

        setResult(null)
      }
    }

    void search()
  }, [client, debouncedText])

  return {query, setQuery, results}
}

export default useUsersSearch
