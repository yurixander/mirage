import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import useMatrix from "@/hooks/matrix/useMatrix"
import {ClientEvent, type Room} from "matrix-js-sdk"
import {useCallback, useState} from "react"

const useRooms = () => {
  // CONSIDER: Replacing this logic with usage of `useSyncedMap`.

  const [rooms, setRooms] = useState<Room[] | null>(null)
  const {isConnected} = useConnection()

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useCallback(() => {
    if (!isConnected) {
      return
    }

    useMatrix(client => {
      const rooms = client.getRooms()

      setRooms(rooms)
    })
  }, [isConnected])

  // REVIEW: Should this be inside a `useEffect`? Or does it automatically handle cleanup (ie. removing the event listener) when this hook is unmounted?
  // Listen for room updates, and update the state accordingly.
  useEventListener(ClientEvent.Room, (event, state, previousStateEvent) => {
    // TODO: Add or remove rooms from the state based on the event.
  })

  return rooms
}

export default useRooms
