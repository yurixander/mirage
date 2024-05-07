import useConnection from "@/hooks/matrix/useConnection"
import {NotificationCountType, type Room, RoomEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import useEventListener from "./useEventListener"
import {RoomType, type RoomProps} from "@/components/Room"
import {useActiveSpaceIdStore} from "./useSpaces"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {saveNotification} from "@/containers/SidebarActions/hooks/notifications"
import {getNotificationFromInviteEvent} from "./useGlobalEventListeners"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getDirectRoomsIds, getRoomsFromSpace} from "@/utils/rooms"
import {getImageUrl} from "@/utils/util"

type PartialRoomProps = {
  roomId: string
  name: string
  containsUnreadMessages: boolean
  mentionCount: number
}

const getPartialRoomProps = (room: Room): PartialRoomProps => {
  return {
    roomId: room.roomId,
    name: room.name,
    containsUnreadMessages:
      room.getUnreadNotificationCount(NotificationCountType.Total) > 0,
    mentionCount: room.getUnreadNotificationCount(
      NotificationCountType.Highlight
    ),
  }
}

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
            ...getPartialRoomProps(updatedRoom),
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
        ? client.getRooms().filter(room => {
            if (room.getMyMembership() === KnownMembership.Join) {
              return true
            }

            if (room.getMyMembership() === KnownMembership.Invite) {
              saveNotification(
                getNotificationFromInviteEvent(
                  room.roomId,
                  room.name,
                  getImageUrl(room.getMxcAvatarUrl(), client)
                )
              )
            }

            return false
          })
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
        ...getPartialRoomProps(room),
        isActive: activeRoomId === room.roomId,
        type: roomType,
        onClick: () => {
          setActiveRoomId(room.roomId)
        },
      })
    }

    setRooms(newRooms)
  }, [activeRoomId, activeSpaceId, client, setActiveRoomId])

  // If the name is changed we update the name.
  useEventListener(RoomEvent.Name, room => {
    setRooms(previousRooms => {
      return previousRooms.map(previousRoom => {
        if (previousRoom.roomId === room.roomId) {
          return {
            ...previousRoom,
            name: room.name,
          }
        }

        return previousRoom
      })
    })
  })

  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId === activeRoomId || client === null) {
      return
    }

    if (event.getType() === "m.room.create" && activeSpaceId === null) {
      const directRoomIds = getDirectRoomsIds(client)

      const newRoom: RoomProps = {
        ...getPartialRoomProps(room),
        isActive: activeRoomId === room.roomId,
        type: directRoomIds.includes(room.roomId)
          ? RoomType.Direct
          : RoomType.Group,
        onClick: () => {
          setActiveRoomId(room.roomId)
        },
      }

      setRooms(prevRooms => [...prevRooms, newRoom])
    }

    updateRoom(room)
  })

  return {rooms, activeRoomId, setActiveRoomId}
}

export default useRooms
