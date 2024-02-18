import useConnection from "@/hooks/matrix/useConnection"
import {type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import useActiveRoom from "./useActiveRoom"

const useRooms = () => {
  // CONSIDER: Replacing this logic with usage of `useSyncedMap`.

  const [rooms, setRooms] = useState<Room[] | null>(null)
  const {client, syncState} = useConnection()
  const {setActiveRoomId, activeRoomId} = useActiveRoom()

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch rooms.")

      return
    }

    setRooms(client.getRooms())
  }, [client, syncState])

  return {rooms, activeRoomId, setActiveRoomId}
}

export default useRooms
