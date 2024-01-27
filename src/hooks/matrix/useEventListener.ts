import useClient from "@/hooks/matrix/useClient"
import {
  type EmittedEvents,
  type MatrixEvent,
  type RoomState,
} from "matrix-js-sdk"
import {useEffect} from "react"

export type MatrixEventCallback<T = void> = (
  event: MatrixEvent,
  state: RoomState,
  previousStateEvent: MatrixEvent | null
) => T

function useEventListener(event: EmittedEvents, listener: MatrixEventCallback) {
  const {client} = useClient()

  useEffect(() => {
    if (client === null) {
      return
    }

    client.on(event, listener)

    return () => {
      client.removeListener(event, listener)
    }
  }, [event, listener])
}

export default useEventListener
