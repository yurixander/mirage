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

  // REVIEW: Should this be inside a `useEffect`? Or does it automatically handle cleanup (ie. removing the event listener) when this hook is unmounted?
  // Listen for room updates, and update the state accordingly.
  // addEventListener(ClientEvent.Room, (event, state, previousStateEvent) => {
  //   // TODO: Add or remove rooms from the state based on the event.
  //   console.log("Room event:", event, state, previousStateEvent)
  // })

  return {spaces, activeSpaceId, setActiveSpaceId, client}
}

export default useSpaces
