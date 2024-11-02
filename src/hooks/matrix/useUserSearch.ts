import {useState, useEffect} from "react"
import {type MatrixClient} from "matrix-js-sdk"
import {getImageUrl} from "@/utils/util"
import {type DMUser} from "@/containers/NavigationSection/DMTrayPopup"

const LIMIT_USER_SEARCH = 100

type UseUserSearchReturnType = {
  debouncedQuery: string
  setDebouncedQuery: React.Dispatch<React.SetStateAction<string>>
  results: DMUser[] | null
  clearResults: () => void
}

const useUsersSearch = (
  client: MatrixClient | null
): UseUserSearchReturnType => {
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [results, setResult] = useState<DMUser[] | null>(null)

  useEffect(() => {
    const search = async (): Promise<void> => {
      if (debouncedQuery.length <= 0 || client === null) {
        setResult(null)

        return
      }

      try {
        const response = await client.searchUserDirectory({
          term: debouncedQuery,
          limit: LIMIT_USER_SEARCH,
        })

        setResult(
          response.results.map(userResult => ({
            displayName: userResult.display_name ?? userResult.user_id,
            userId: userResult.user_id,
            avatarUrl: getImageUrl(userResult.avatar_url, client),
          }))
        )
      } catch (error) {
        console.error("Error during user search:", error)

        setResult(null)
      }
    }

    void search()
  }, [client, debouncedQuery])

  return {
    debouncedQuery,
    setDebouncedQuery,
    results,
    clearResults() {
      setResult(null)
    },
  }
}

export default useUsersSearch
