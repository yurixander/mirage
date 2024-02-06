import {type MatrixClient, type Room} from "matrix-js-sdk"
import {useState} from "react"

const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([])

  const refreshRooms = (client: MatrixClient) => {
    if (!client.isLoggedIn()) {
      return
    }

    const rooms: Room[] = Object.values(
      client.store.rooms as Record<string, Room>
    )

    setRooms(rooms)
  }

  return {rooms, refreshRooms}
}

export default useRooms
