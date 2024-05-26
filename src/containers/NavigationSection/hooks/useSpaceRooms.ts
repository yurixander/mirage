import {useCallback, useEffect} from "react"
import {type PartialRoom} from "../SpaceList"
import useConnection from "@/hooks/matrix/useConnection"
import useList from "@/hooks/util/useList"
import {EventType, type MatrixClient, RoomEvent, RoomType} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"
import {type IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"
import {generateUniqueNumber} from "@/utils/util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

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

    if (storedRoom === null || storedRoom.isSpaceRoom()) {
      return null
    }

    return {
      roomId: storedRoom.roomId,
      roomName: storedRoom.name,
      id: generateUniqueNumber(),
    }
  }

  return {
    roomId: room.room_id,
    roomName: room.name,
    id: generateUniqueNumber(),
  }
}

const useSpaceRooms = (spaceId: string) => {
  const {client} = useConnection()

  const {
    items,
    addItem: addRoom,
    updateItem: updateRoom,
    deleteWhen: deleteRoomWhen,
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
      room === undefined ||
      !room.isSpaceRoom() ||
      room.roomId !== spaceId ||
      client === null
    ) {
      return
    }

    const eventRoom = client.getRoom(event.getStateKey())

    if (eventRoom === null) {
      return
    }

    if (event.getContent().via === undefined) {
      deleteRoomWhen(roomIter => roomIter.roomId === eventRoom.roomId)

      return
    }

    addRoom({
      roomId: eventRoom.roomId,
      roomName: eventRoom.name,
      id: generateUniqueNumber(),
    })
  })

  useEventListener(RoomEvent.Name, room => {
    if (room.isSpaceRoom()) {
      return
    }

    updateRoom({
      roomId: room.roomId,
      roomName: room.name,
      id: generateUniqueNumber(),
    })
  })

  useEventListener(RoomEvent.MyMembership, (room, membership) => {
    if (
      (membership !== KnownMembership.Leave &&
        membership !== KnownMembership.Ban) ||
      room.isSpaceRoom()
    ) {
      return
    }

    deleteRoomWhen(roomIter => roomIter.roomId === room.roomId)
  })

  return {
    childRooms: items,
  }
}

export default useSpaceRooms
