import {useCallback, useEffect} from "react"
import useList from "../../../hooks/util/useList"
import useConnection from "../../../hooks/matrix/useConnection"
import {
  type Space,
  type PartialRoom,
} from "@/containers/NavigationSection/SpaceList"
import {getRoomsFromSpace} from "@/utils/spaces"

const hasRepeat = (space1: Space, space2: Space): boolean =>
  space1.spaceId === space2.spaceId

const useSpaces = () => {
  const {items: spaces, addItem: addSpace} = useList<Space>(hasRepeat)
  const {client} = useConnection()

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

    addSpace({
      name: "All Rooms",
      spaceId: "all_rooms",
      childRooms: allRooms,
    })

    for (const storeSpace of storeSpaces) {
      void getRoomsFromSpace(storeSpace)
        .then(childRooms => {
          addSpace({
            name: storeSpace.name,
            spaceId: storeSpace.roomId,
            childRooms,
          })
        })
        .catch(error => {
          // TODO: Handle error here instead.
          console.error(error)
        })
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

  return {spaces}
}

export default useSpaces
