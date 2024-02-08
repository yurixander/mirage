import useConnection from "@/hooks/matrix/useConnection"
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

function useEventListener(
  event: EmittedEvents,
  listener: MatrixEventCallback,
  isContinuous = true
) {
  const {client} = useConnection()

  useEffect(() => {
    if (client === null) {
      return
    }

    if (isContinuous) {
      client.on(event, listener)
    } else {
      client.once(event, listener)
    }

    return () => {
      client.removeListener(event, listener)
    }
  }, [client, event, listener])
}

export default useEventListener
