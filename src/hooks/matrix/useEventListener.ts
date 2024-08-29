import {
  type EmittedEvents,
  type MatrixEvent,
  type RoomState,
  type Listener,
  type ClientEventHandlerMap,
  type EventEmitterEvents,
} from "matrix-js-sdk"
import {useEffect} from "react"
import useMatrixClient from "./useMatrixClient"

export type MatrixEventCallback<Return = void> = (
  event: MatrixEvent,
  state: RoomState,
  previousStateEvent: MatrixEvent | null
) => Return

function useEventListener<Event extends EmittedEvents | EventEmitterEvents>(
  event: Event,
  listener: Listener<EmittedEvents, ClientEventHandlerMap, Event>,
  isContinuous = true
): void {
  const client = useMatrixClient()

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
  }, [client, event, isContinuous, listener])
}

export default useEventListener
