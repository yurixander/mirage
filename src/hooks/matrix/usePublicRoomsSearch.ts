import {useEffect, useState} from "react"
import useDebounced from "../util/useDebounced"
import type {IPublicRoomsChunkRoom, MatrixClient} from "matrix-js-sdk"
import type React from "react"

type UsePublicRoomsSearch = {
  isResultLoading: boolean
  roomAddress: string
  results: IPublicRoomsChunkRoom[] | null
  setRoomAddress: React.Dispatch<React.SetStateAction<string>>
}

const usePublicRoomsSearch = (
  client: MatrixClient | null,
  searchDelay = 500
): UsePublicRoomsSearch => {
  const [roomAddress, setRoomAddress] = useState("")
  const debouncedAddress = useDebounced(roomAddress, searchDelay)
  const [results, setResult] = useState<IPublicRoomsChunkRoom[] | null>(null)
  const [isResultLoading, setResultIsLoading] = useState(false)

  useEffect(() => {
    const search = async (): Promise<void> => {
      if (debouncedAddress.length <= 0 || client === null) {
        setResult(null)

        return
      }

      try {
        setResultIsLoading(true)

        const response = await client.publicRooms({
          filter: {
            generic_search_term: debouncedAddress,
          },
          include_all_networks: true,
          limit: 1,
        })

        setResult(response.chunk)
      } catch (error) {
        console.error("Error during user search:", error)

        setResult(null)
      }

      setResultIsLoading(false)
    }

    void search()
  }, [client, debouncedAddress])

  return {results, setRoomAddress, roomAddress, isResultLoading}
}

export default usePublicRoomsSearch
