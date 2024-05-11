import {useCallback, useEffect} from "react"
import useList from "../util/useList"
import useConnection from "./useConnection"
import {RoomType} from "matrix-js-sdk"
import {
  type Space,
  type PartialRoom,
} from "@/containers/NavigationSection/SpaceList"

const hasRepeat = (space1: Space, space2: Space): boolean =>
  space1.spaceId === space2.spaceId

const useNavigation = () => {
  const {items: spaces, addItem: addSpace} = useList<Space>(hasRepeat)
  const {client} = useConnection()

  const fetchSpaces = useCallback(() => {
    if (client === null) {
      return
    }

    const storeSpaces = client.getRooms().filter(room => room.isSpaceRoom())

    for (const storeSpace of storeSpaces) {
      client
        .getRoomHierarchy(storeSpace.roomId)
        .then(roomHierarchy => {
          const childRooms: PartialRoom[] = []

          for (const room of roomHierarchy.rooms) {
            if (room.name === undefined || room.room_type === RoomType.Space) {
              continue
            }

            childRooms.push({
              roomId: room.room_id,
              roomName: room.name,
            })
          }

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

export default useNavigation
