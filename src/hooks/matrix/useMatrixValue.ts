import useMatrixClient from "./useMatrixClient"
import {useCallback, useEffect, useState} from "react"
import {type ValueState} from "../util/useValueState"
import {type MatrixClient} from "matrix-js-sdk"
import useIsMountedReference from "../util/useIsMountedRef"

type MatrixAsyncValueReturnType<T> = {
  state: ValueState<T>
  execute: (callback: (client: MatrixClient) => Promise<T>) => void
  setState: React.Dispatch<React.SetStateAction<ValueState<T>>>
}

const useMatrixValue = <T>(
  action?: (client: MatrixClient) => Promise<T>
): MatrixAsyncValueReturnType<T> => {
  const client = useMatrixClient()
  const [state, setState] = useState<ValueState<T>>({status: "loading"})
  const isMountedRef = useIsMountedReference()

  const safeSetState = useCallback(
    (value: ValueState<T>) => {
      if (isMountedRef) {
        setState(value)
      }
    },
    [isMountedRef]
  )

  const execute = useCallback(
    (callback: (client: MatrixClient) => Promise<T>) => {
      if (client === null) {
        return null
      }

      void callback(client)
        .then(value => {
          safeSetState({
            status: "success",
            data: value,
          })
        })
        .catch(error => {
          safeSetState({
            status: "error",
            error,
          })
        })
    },
    [client, safeSetState]
  )

  useEffect(() => {
    if (action === undefined) {
      return
    }

    execute(action)
  }, [execute])

  return {state, execute, setState}
}

export default useMatrixValue
