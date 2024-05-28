import {useEffect, useState} from "react"
import useDebounced from "../util/useDebounced"
import {type IPublicRoomsChunkRoom, type MatrixClient} from "matrix-js-sdk"

const usePublicRoomsSearch = (
  client: MatrixClient | null,
  searchDelay = 500
) => {
  const [roomAddress, setRoomAddress] = useState("")
  const debouncedAddress = useDebounced(roomAddress, searchDelay)
  const [results, setResult] = useState<IPublicRoomsChunkRoom[] | null>(null)

  useEffect(() => {
    const search = async () => {
      if (debouncedAddress.length <= 0 || client === null) {
        setResult(null)

        return
      }

      try {
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
    }

    void search()
  }, [client, debouncedAddress])

  return {results, setRoomAddress, roomAddress}
}

export default usePublicRoomsSearch
