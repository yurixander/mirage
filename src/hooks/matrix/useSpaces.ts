import useConnection from "@/hooks/matrix/useConnection"
import {type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import {create} from "zustand"

type ActiveSpaceIdStore = {
  activeSpaceId: string | null
  setActiveSpaceId: (spaceId: string | null) => void
}

export const useActiveSpaceIdStore = create<ActiveSpaceIdStore>(set => ({
  activeSpaceId: null,
  setActiveSpaceId: spaceId => {
    set(() => ({activeSpaceId: spaceId}))
  },
}))

const useSpaces = () => {
  // CONSIDER: Replacing this logic with usage of `useSyncedMap`.

  const [spaces, setSpace] = useState<Room[] | null>(null)
  const {client, syncState} = useConnection()
  const {activeSpaceId, setActiveSpaceId} = useActiveSpaceIdStore()

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch spaces.")

      return
    }

    setSpace(client.getRooms().filter(room => room.isSpaceRoom()))
  }, [client, syncState])

  return {spaces, activeSpaceId, setActiveSpaceId}
}

export default useSpaces
