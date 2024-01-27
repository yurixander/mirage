import useEventListener, {
  type MatrixEventCallback,
} from "@/hooks/matrix/useEventListener"
import {Map} from "immutable"
import {type EmittedEvents} from "matrix-js-sdk"
import {useState} from "react"

function useSyncedMap<Key, Value>(
  addEvent: EmittedEvents,
  removeEvent: EmittedEvents,
  add: MatrixEventCallback<[Key, Value] | null>,
  remove: MatrixEventCallback<Key | null>
): Map<Key, Value> {
  const [map, setMap] = useState<Map<Key, Value>>(Map())

  useEventListener(addEvent, (event, state, previousStateEvent) => {
    const keyValuePair = add(event, state, previousStateEvent)

    if (keyValuePair === null) {
      return
    }

    const [key, value] = keyValuePair

    setMap(map => map.set(key, value))
  })

  useEventListener(removeEvent, (event, state, previousStateEvent) => {
    const key = remove(event, state, previousStateEvent)

    if (key === null) {
      return
    }

    setMap(map => map.delete(key))
  })

  return map
}

export default useSyncedMap
