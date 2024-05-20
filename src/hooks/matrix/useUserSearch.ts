import {useState, useEffect} from "react"
import {type MatrixClient} from "matrix-js-sdk"
import useDebounced from "../util/useDebounced"

const LIMIT_USER_SEARCH = 100

type UserSearchResult = {
  displayName: string
  userId: string
  avatarUrl?: string
}

const useUsersSearch = (client: MatrixClient | null, searchDelay = 500) => {
  const [query, setQuery] = useState("")
  const [results, setResult] = useState<UserSearchResult[] | null>(null)
  const debouncedText = useDebounced(query, searchDelay)

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
            userId: userResult.user_id,
            avatarUrl: userResult.avatar_url,
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
