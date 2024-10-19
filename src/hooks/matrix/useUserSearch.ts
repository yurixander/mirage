import type {DMUser} from "@/containers/NavigationSection/DMTrayPopup"
import {getImageUrl} from "@/utils/util"
import type {MatrixClient} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import type React from "react"
import useDebounced from "../util/useDebounced"

const LIMIT_USER_SEARCH = 100

type UseUserSearchReturnType = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  results: DMUser[] | null
  clearResults: () => void
}

const useUsersSearch = (
  client: MatrixClient | null,
  searchDelay = 500
): UseUserSearchReturnType => {
  const [query, setQuery] = useState("")
  const [results, setResult] = useState<DMUser[] | null>(null)
  const debouncedText = useDebounced(query, searchDelay)

  useEffect(() => {
    const search = async (): Promise<void> => {
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
            avatarUrl: getImageUrl(userResult.avatar_url, client),
          }))
        )
      } catch (error) {
        console.error("Error during user search:", error)

        setResult(null)
      }
    }

    void search()
  }, [client, debouncedText])

  return {
    query,
    setQuery,
    results,
    clearResults() {
      setResult(null)
    },
  }
}

export default useUsersSearch
