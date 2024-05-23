import {useCallback, useEffect} from "react"
import {type PartialRoom} from "../SpaceList"
import useConnection from "@/hooks/matrix/useConnection"
import useList from "@/hooks/util/useList"
import {EventType, type MatrixClient, RoomEvent, RoomType} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"
import {type IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"

const hasRepeat = (room1: PartialRoom, room2: PartialRoom): boolean =>
  room1.roomId === room2.roomId

const processHierarchyRoom = (
  room: IHierarchyRoom,
  client: MatrixClient
): PartialRoom | null => {
  if (room.room_type === RoomType.Space) {
    return null
  }

  // If the name is not defined, try to get the room.
  if (room.name === undefined) {
    const storedRoom = client.getRoom(room.room_id)

    if (storedRoom === null) {
      return null
    }

    return {
      roomId: storedRoom.roomId,
      roomName: storedRoom.name,
    }
  }

  return {
    roomId: room.room_id,
    roomName: room.name,
  }
}

const useSpaceRooms = (spaceId: string) => {
  const {client} = useConnection()

  const {
    items,
    addItem: addRoom,
    updateItem: updateRoom,
  } = useList<PartialRoom>(hasRepeat)

  const fetchChildRooms = useCallback(() => {
    if (client === null) {
      return
    }

    const childRooms = client.getRoomHierarchy(spaceId)

    childRooms
      .then(childRooms => {
        for (const childRoom of childRooms.rooms) {
          const childRoomProcessed = processHierarchyRoom(childRoom, client)

          if (childRoomProcessed === null) {
            continue
          }

          addRoom(childRoomProcessed)
        }
      })
      .catch(error => {
        // TODO: Handle errors here.
        throw error
      })
  }, [addRoom, client, spaceId])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchChildRooms()
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchChildRooms])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (
      event.getType() !== EventType.SpaceChild ||
      !room?.isSpaceRoom() ||
      room.roomId !== spaceId
    ) {
      return
    }

    addRoom({
      roomId: room.roomId,
      roomName: room.name,
    })
  })

  useEventListener(RoomEvent.Name, room => {
    if (room.isSpaceRoom()) {
      return
    }

    updateRoom({
      roomId: room.roomId,
      roomName: room.name,
    })
  })

  return {
    childRooms: items,
  }
}

export default useSpaceRooms
