import {
  type Room,
  type RoomEmittedEvents,
  type RoomEventHandlerMap,
} from "matrix-js-sdk"
import {
  type Listener,
  type EventEmitterEvents,
} from "matrix-js-sdk/lib/models/typed-event-emitter"
import {useEffect} from "react"

function useRoomListener<
  RoomEvent extends RoomEmittedEvents | EventEmitterEvents,
>(
  room: Room | null,
  event: RoomEvent,
  listener: Listener<RoomEmittedEvents, RoomEventHandlerMap, RoomEvent>,
  isContinuous = true
): void {
  useEffect(() => {
    if (room === null) {
      return
    }

    if (isContinuous) {
      room.on(event, listener)
    } else {
      room.once(event, listener)
    }

    return () => {
      room.off(event, listener)
    }
  }, [event, isContinuous, listener, room])
}

export default useRoomListener
