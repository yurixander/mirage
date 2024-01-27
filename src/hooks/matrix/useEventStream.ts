import {type EmittedEvents} from "matrix-js-sdk"
import {useState} from "react"
import useEventListener, {type MatrixEventCallback} from "./useEventListener"

function useEventStream<T>(
  event: EmittedEvents,
  defaultValue: T,
  chooseValue: MatrixEventCallback<T>
): T {
  const [value, setValue] = useState<T>(defaultValue)

  useEventListener(event, (event, state, previousStateEvent) => {
    setValue(chooseValue(event, state, previousStateEvent))
  })

  return value
}

export default useEventStream
