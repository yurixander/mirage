import {useEffect} from "react"
import useList from "../../../hooks/util/useList"
import useConnection from "../../../hooks/matrix/useConnection"
import {type PartialRoom} from "@/containers/NavigationSection/SpaceList"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {generateUniqueNumber} from "@/utils/util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {hasRoomRepeat} from "@/components/Room"

export type PartialSpace = {
  name: string
  spaceId: string
}

const hasSpaceRepeat = (space1: PartialSpace, space2: PartialSpace): boolean =>
  space1.spaceId === space2.spaceId

const processSpace = (space: Room): PartialSpace => {
  return {
    name: space.name,
    spaceId: space.roomId,
  }
}

const useSpaces = () => {
  const {client} = useConnection()

  const {
    items: allRooms,
    addItem: addRoom,
    updateItem: updateRoom,
    deleteWhen: deleteRoomWhen,
  } = useList<PartialRoom>(hasRoomRepeat)

  const {
    items: spaces,
    addItem: addSpace,
    updateItem: updateSpace,
    deleteWhen: deleteSpaceWhen,
  } = useList<PartialSpace>(hasSpaceRepeat)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (client === null) {
        return
      }

      for (const room of client.getRooms()) {
        if (room.isSpaceRoom()) {
          addSpace(processSpace(room))

          continue
        }

        addRoom({
          roomId: room.roomId,
          roomName: room.name,
          id: generateUniqueNumber(),
        })
      }
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [addRoom, addSpace, client])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || room === undefined) {
      return
    }

    if (room.isSpaceRoom()) {
      addSpace(processSpace(room))

      return
    }

    addRoom({
      id: generateUniqueNumber(),
      roomId: room.roomId,
      roomName: room.name,
    })
  })

  useEventListener(RoomEvent.Name, room => {
    if (room.isSpaceRoom()) {
      updateSpace(processSpace(room))

      return
    }

    updateRoom({
      id: generateUniqueNumber(),
      roomId: room.roomId,
      roomName: room.name,
    })
  })

  useEventListener(RoomEvent.MyMembership, (room, membership) => {
    if (
      membership !== KnownMembership.Leave &&
      membership !== KnownMembership.Ban
    ) {
      return
    }

    if (room.isSpaceRoom()) {
      deleteSpaceWhen(spaceIter => spaceIter.spaceId === room.roomId)

      return
    }

    deleteRoomWhen(roomIter => roomIter.roomId === room.roomId)
  })

  return {spaces, allRooms}
}

export default useSpaces
