import {useCallback, useEffect, useState} from "react"
import {type PartialRoom} from "../SpaceList"
import useConnection from "@/hooks/matrix/useConnection"
import useList from "@/hooks/util/useList"
import {EventType, type MatrixClient, RoomEvent, RoomType} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"
import {type IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"
import {generateUniqueNumber} from "@/utils/util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {hasRoomRepeat} from "@/components/Room"

const processHierarchyRoom = (
  room: IHierarchyRoom,
  client: MatrixClient
): PartialRoom | null => {
  // If the name or room_type is not defined, try to get the room.
  if (room.name === undefined || room.room_type === undefined) {
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

  if (room.room_type === RoomType.Space) {
    return null
  }

  return {
    roomId: room.room_id,
    roomName: room.name,
    id: generateUniqueNumber(),
  }
}

type UseSpaceRoomsReturnType = {
  childRooms: PartialRoom[]
  isLoading: boolean
}

const useSpaceRooms = (spaceId: string): UseSpaceRoomsReturnType => {
  const {client} = useConnection()
  const [isLoading, setIsLoading] = useState(false)

  const {
    items,
    addItem: addRoom,
    updateItem: updateRoom,
    deleteWhen: deleteRoomWhen,
  } = useList<PartialRoom>(hasRoomRepeat)

  const fetchChildRooms = useCallback(async () => {
    if (client === null) {
      return
    }

    setIsLoading(true)

    try {
      const childRooms = await client.getRoomHierarchy(spaceId)

      for (const childRoom of childRooms.rooms) {
        const childRoomProcessed = processHierarchyRoom(childRoom, client)

        if (childRoomProcessed === null) {
          continue
        }

        addRoom(childRoomProcessed)
      }

      setIsLoading(false)
    } catch (error) {
      console.error(
        "An error occurred while retrieving rooms from the space:",
        error
      )
    }
  }, [addRoom, client, spaceId])

  useEffect(() => {
    const handler = setTimeout(() => {
      void fetchChildRooms()
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

    // In this context, the state_key is the room_id.
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
    isLoading,
  }
}

export default useSpaceRooms
