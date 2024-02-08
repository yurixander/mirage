import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import {ClientEvent, type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"

const useRooms = () => {
  // CONSIDER: Replacing this logic with usage of `useSyncedMap`.

  const [rooms, setRooms] = useState<Room[] | null>(null)
  const {client, isSynced} = useConnection()

  console.log(isSynced, client)

  // Initial gathering of rooms, when a connection is
  // established or re-established.
  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch rooms.")

      return
    }

    alert("Updated rooms")
    setRooms(client.getRooms())
  }, [client, setRooms])

  // REVIEW: Should this be inside a `useEffect`? Or does it automatically handle cleanup (ie. removing the event listener) when this hook is unmounted?
  // Listen for room updates, and update the state accordingly.
  useEventListener(ClientEvent.Room, (event, state, previousStateEvent) => {
    // TODO: Add or remove rooms from the state based on the event.
    console.log("Room event:", event, state, previousStateEvent)
  })

  return {rooms}
}

export default useRooms
