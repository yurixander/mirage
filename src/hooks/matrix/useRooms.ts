import useConnection from "@/hooks/matrix/useConnection"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import useActiveRoom from "./useActiveRoom"
import useEventListener from "./useEventListener"

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

  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId === activeRoomId || client === null) {
      return
    }

    // TODO: Just refresh the room with has this event with ´useSyncedMap´
    setRooms(client.getRooms())
  })

  return {rooms, activeRoomId, setActiveRoomId}
}

export default useRooms
