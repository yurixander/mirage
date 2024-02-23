import {EventTimeline, type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import useConnection from "./useConnection"
import {useActiveSpaceIdStore} from "./useSpaces"
import {getJustDirectRooms} from "@/utils/util"

const useSpaceRooms = () => {
  const [childRooms, setChildRooms] = useState<Room[]>([])
  const [childDirectRooms, setChildDirectRooms] = useState<Room[]>([])
  const {client, syncState} = useConnection()
  const {activeSpaceId} = useActiveSpaceIdStore()

  useEffect(() => {
    if (client === null || activeSpaceId === null) {
      return
    }

    const space = client.getRoom(activeSpaceId)

    if (!space?.isSpaceRoom()) {
      return
    }

    // TODO: Handle that not repeat the rooms
    const childEvents = space
      .getLiveTimeline()
      .getState(EventTimeline.FORWARDS)
      ?.events.get("m.space.child")

    if (childEvents === undefined) {
      return
    }

    const rooms: Room[] = []
    for (const [stateKey] of childEvents) {
      const room = client.getRoom(stateKey)

      if (room !== null) {
        rooms.push(room)
      }
    }

    const directChildRooms = getJustDirectRooms(rooms, client)
    const defaultChildRooms = rooms.filter(
      room => !room.isSpaceRoom() && !directChildRooms.includes(room)
    )

    setChildDirectRooms(directChildRooms)
    setChildRooms(defaultChildRooms)
  }, [activeSpaceId, client, syncState])

  return {childRooms, childDirectRooms, activeSpaceId}
}

export default useSpaceRooms
