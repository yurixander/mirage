import {useCallback, useEffect} from "react"
import useList from "../../../hooks/util/useList"
import useConnection from "../../../hooks/matrix/useConnection"
import {
  type Space,
  type PartialRoom,
} from "@/containers/NavigationSection/SpaceList"
import {getRoomsFromSpace} from "@/utils/spaces"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"

const hasRepeat = (space1: Space, space2: Space): boolean =>
  space1.spaceId === space2.spaceId

const useSpaces = () => {
  const {client} = useConnection()
  const {items, addItem, updateItem, setItem} = useList<Space>(hasRepeat)

  const updateRoomChild = (room: Room) => {
    setItem(prevSpaces =>
      prevSpaces.map(space => {
        return {
          name: space.name,
          spaceId: space.spaceId,
          childRooms: space.childRooms.map(childRoom => {
            if (childRoom.roomId === room.roomId) {
              return {
                roomId: room.roomId,
                roomName: room.name,
              }
            }

            return childRoom
          }),
        }
      })
    )
  }

  const updateSpace = useCallback(
    async (space: Room) => {
      const childRooms = await getRoomsFromSpace(space)

      updateItem({
        name: space.name,
        spaceId: space.roomId,
        childRooms,
      })
    },
    [updateItem]
  )

  const addSpace = useCallback(
    async (space: Room) => {
      const childRooms = await getRoomsFromSpace(space)

      addItem({
        name: space.name,
        spaceId: space.roomId,
        childRooms,
      })
    },
    [addItem]
  )

  const fetchSpaces = useCallback(() => {
    if (client === null) {
      return
    }

    const allRooms: PartialRoom[] = []

    const storeSpaces = client.getRooms().filter(room => {
      if (room.isSpaceRoom()) {
        return true
      }

      allRooms.push({
        roomId: room.roomId,
        roomName: room.name,
      })

      return false
    })

    addItem({
      name: "All Rooms",
      spaceId: "all_rooms",
      childRooms: allRooms,
    })

    for (const storeSpace of storeSpaces) {
      void addSpace(storeSpace)
    }
  }, [addItem, addSpace, client])

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

    void addSpace(room)
  })

  useEventListener(RoomEvent.Name, room => {
    if (room.isSpaceRoom()) {
      void updateSpace(room)

      return
    }

    updateRoomChild(room)
  })

  return {spaces: items}
}

export default useSpaces
