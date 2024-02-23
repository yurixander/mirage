import useConnection from "@/hooks/matrix/useConnection"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import useActiveRoom from "./useActiveRoom"
import useEventListener from "./useEventListener"
import {getJustDirectRooms} from "@/utils/util"

const useRooms = () => {
  // CONSIDER: Replacing this logic with usage of `useSyncedMap`.
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [directRooms, setDirectRooms] = useState<Room[] | null>(null)
  const {client, syncState} = useConnection()
  const {setActiveRoomId, activeRoomId, activeRoom} = useActiveRoom()

  const updateRoom = useCallback(
    (updatedRoom: Room) => {
      const roomsUpdated =
        rooms?.map(room => {
          if (room.roomId === updatedRoom.roomId) {
            return updatedRoom
          }
          return room
        }) ?? null
      setRooms(roomsUpdated)
    },
    [rooms]
  )

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch rooms.")

      return
    }

    const storeRooms = client.getRooms()
    const directRooms = getJustDirectRooms(storeRooms, client)
    const defaultRooms = storeRooms.filter(
      room => !room.isSpaceRoom() && !directRooms.includes(room)
    )

    setDirectRooms(directRooms)
    setRooms(defaultRooms)
  }, [client, syncState])

  useEffect(() => {
    if (activeRoom === null) {
      return
    }

    updateRoom(activeRoom)
  }, [activeRoom, activeRoomId, updateRoom])

  useEventListener(RoomEvent.Timeline, (_event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId === activeRoomId || client === null) {
      return
    }

    updateRoom(room)
  })

  return {rooms, directRooms, activeRoomId, setActiveRoomId}
}

export default useRooms
