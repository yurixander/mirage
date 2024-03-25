import useConnection from "@/hooks/matrix/useConnection"
import {NotificationCountType, type Room, RoomEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import useEventListener from "./useEventListener"
import {getDirectRoomsIds, getRoomsFromSpace, normalizeName} from "@/utils/util"
import {RoomType, type RoomProps} from "@/components/Room"
import {useActiveSpaceIdStore} from "./useSpaces"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

const useRooms = () => {
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const {client} = useConnection()
  const {activeSpaceId} = useActiveSpaceIdStore()
  const {setActiveRoomId, activeRoomId} = useActiveRoomIdStore()

  const updateRoom = useCallback((updatedRoom: Room) => {
    setRooms(previousRooms => {
      return previousRooms.map(room => {
        if (room.roomId === updatedRoom.roomId) {
          return {
            ...room,
            name: updatedRoom.name,
            containsUnreadMessages:
              updatedRoom.getUnreadNotificationCount(
                NotificationCountType.Total
              ) > 0,
            mentionCount: updatedRoom.getUnreadNotificationCount(
              NotificationCountType.Highlight
            ),
          }
        }

        return room
      })
    })
  }, [])

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch rooms.")

      return
    }

    const storeRooms =
      activeSpaceId === null
        ? client.getRooms().filter(room => room.getMyMembership() === "join")
        : getRoomsFromSpace(activeSpaceId, client)

    const directRoomIds = getDirectRoomsIds(client)
    const newRooms: RoomProps[] = []

    for (const room of storeRooms) {
      if (room.isSpaceRoom()) {
        continue
      }

      const roomType = directRoomIds.includes(room.roomId)
        ? RoomType.Direct
        : RoomType.Group

      newRooms.push({
        roomId: room.roomId,
        name: normalizeName(room.name),
        containsUnreadMessages:
          room.getUnreadNotificationCount(NotificationCountType.Total) > 0,
        mentionCount: room.getUnreadNotificationCount(
          NotificationCountType.Highlight
        ),
        isActive: activeRoomId === room.roomId,
        type: roomType,
        onClick: () => {
          setActiveRoomId(room.roomId)
        },
      })
    }

    setRooms(newRooms)
  }, [activeRoomId, activeSpaceId, client, setActiveRoomId])

  useEventListener(RoomEvent.Timeline, (_event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId === activeRoomId || client === null) {
      return
    }

    updateRoom(room)
  })

  return {rooms, activeRoomId, setActiveRoomId}
}

export default useRooms
