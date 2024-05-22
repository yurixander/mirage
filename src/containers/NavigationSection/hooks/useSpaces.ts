import {useCallback, useEffect} from "react"
import useList from "../../../hooks/util/useList"
import useConnection from "../../../hooks/matrix/useConnection"
import {type Space} from "@/containers/NavigationSection/SpaceList"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"

const hasRepeat = (space1: Space, space2: Space): boolean =>
  space1.spaceId === space2.spaceId

const processSpace = (space: Room): Space => {
  return {
    name: space.name,
    spaceId: space.roomId,
  }
}

const useSpaces = () => {
  const {client} = useConnection()

  const {
    items,
    addItem: addSpace,
    updateItem: updateSpace,
  } = useList<Space>(hasRepeat)

  const fetchSpaces = useCallback(() => {
    if (client === null) {
      return
    }

    const storeSpaces = client.getRooms().filter(room => room.isSpaceRoom())

    for (const storeSpace of storeSpaces) {
      addSpace(processSpace(storeSpace))
    }
  }, [addSpace, client])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSpaces()
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchSpaces])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (
      (event.getType() !== EventType.RoomCreate &&
        event.getType() !== EventType.SpaceChild) ||
      !room?.isSpaceRoom()
    ) {
      return
    }

    addSpace(processSpace(room))
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    updateSpace(processSpace(room))
  })

  return {spaces: items}
}

export default useSpaces
