import {useCallback, useEffect} from "react"
import {type PartialRoom} from "../SpaceList"
import useConnection from "@/hooks/matrix/useConnection"
import useList from "@/hooks/util/useList"
import {RoomType} from "matrix-js-sdk"

const hasRepeat = (room1: PartialRoom, room2: PartialRoom): boolean =>
  room1.roomId === room2.roomId

const useSpaceRooms = (spaceId: string) => {
  const {client} = useConnection()
  const {items, addItem} = useList<PartialRoom>(hasRepeat)

  const fetchChildRooms = useCallback(() => {
    if (client === null) {
      return
    }

    const childRooms = client.getRoomHierarchy(spaceId)

    childRooms
      .then(childRooms => {
        for (const childRoom of childRooms.rooms) {
          if (
            childRoom.name === undefined ||
            childRoom.room_type === RoomType.Space
          ) {
            continue
          }

          addItem({roomId: childRoom.room_id, roomName: childRoom.name})
        }
      })
      .catch(error => {
        // TODO: Handle errors here.
        throw error
      })
  }, [addItem, client, spaceId])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchChildRooms()
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchChildRooms])

  return {
    childRooms: items,
  }
}

export default useSpaceRooms
