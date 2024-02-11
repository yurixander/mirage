import {EventTimeline, type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import useConnection from "./useConnection"
import {useActiveRoomIdStore} from "./useSpaces"

const useSpaceRooms = () => {
  const [childRooms, setChildRooms] = useState<Room[]>([])
  const {client, syncState} = useConnection()
  const {activeSpaceId} = useActiveRoomIdStore()

  useEffect(() => {
    if (client === null || activeSpaceId === null) {
      return
    }

    const space = client.getRoom(activeSpaceId)

    if (!space?.isSpaceRoom()) {
      return
    }

    // Handle that not repeat the rooms
    const childEvents = space
      .getLiveTimeline()
      .getState(EventTimeline.FORWARDS)
      ?.events.get("m.space.child")

    if (childEvents === undefined) {
      return
    }

    const rooms: Room[] = []
    for (const [stateKey, _] of childEvents) {
      const room = client.getRoom(stateKey)

      if (room !== null) {
        rooms.push(room)
      }
    }

    setChildRooms(rooms)
  }, [activeSpaceId, client, syncState])

  return {childRooms, activeSpaceId}
}

export default useSpaceRooms
