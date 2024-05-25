import {useCallback, useEffect} from "react"
import useList from "../../../hooks/util/useList"
import useConnection from "../../../hooks/matrix/useConnection"
import {
  type PartialRoom,
  type Space,
} from "@/containers/NavigationSection/SpaceList"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {generateUniqueNumber} from "@/utils/util"

const hasSpaceRepeat = (space1: Space, space2: Space): boolean =>
  space1.spaceId === space2.spaceId

const hasRoomRepeat = (room1: PartialRoom, room2: PartialRoom): boolean =>
  room1.roomId === room2.roomId

const processSpace = (space: Room): Space => {
  return {
    name: space.name,
    spaceId: space.roomId,
  }
}

const useSpaces = () => {
  const {client} = useConnection()
  const {items, addItem: addRoom} = useList<PartialRoom>(hasRoomRepeat)

  const {
    items: spaces,
    addItem: addSpace,
    updateItem: updateSpace,
  } = useList<Space>(hasSpaceRepeat)

  const fetchSpaces = useCallback(() => {
    if (client === null) {
      return
    }

    const storeSpaces = client.getRooms().filter(room => {
      if (room.isSpaceRoom()) {
        return true
      }

      addRoom({
        roomId: room.roomId,
        roomName: room.name,
        id: generateUniqueNumber(),
      })

      return false
    })

    for (const storeSpace of storeSpaces) {
      addSpace(processSpace(storeSpace))
    }
  }, [addRoom, addSpace, client])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSpaces()
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchSpaces])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || !room?.isSpaceRoom()) {
      return
    }

    addSpace(processSpace(room))
  })

  useEventListener(RoomEvent.Name, room => {
    if (room.isSpaceRoom()) {
      updateSpace(processSpace(room))

      return
    }

    addRoom({
      id: generateUniqueNumber(),
      roomId: room.roomId,
      roomName: room.name,
    })
  })

  return {spaces, allRooms: items}
}

export default useSpaces
