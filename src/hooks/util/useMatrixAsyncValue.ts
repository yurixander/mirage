import {type MatrixClient} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import useMatrixClient from "../matrix/useMatrixClient"
import useAsyncState, {type AsyncState} from "./useAsyncState"

type MatrixAsyncValueReturnType<T> = {
  state: AsyncState<T>
  execute: (asyncFunction: () => Promise<T>) => void
  reinvokeAction: () => void
}

const useMatrixAsyncValue = <T>(
  action: (client: MatrixClient) => Promise<T>
): MatrixAsyncValueReturnType<T> => {
  const client = useMatrixClient()
  const [state, setState] = useAsyncState<T>()

  const reinvokeAction = useCallback(() => {
    if (client === null) {
      return
    }

    void action(client)
      .then(data => {
        setState({status: "success", data})
      })
      .catch((error: Error) => {
        setState({status: "error", error})
      })
  }, [action, client])

  const execute = useCallback(
    (callback: (client: MatrixClient) => Promise<T>) => {
      if (state.status === "loading" || client === null) {
        return
      }

      setState({status: "loading"})

      callback(client)
        .then(data => {
          setState({status: "success", data})
        })
        .catch(error => {
          setState({status: "error", error})
        })
    },
    [client, state.status]
  )

  useEffect(() => {
    if (client === null) {
      return
    }

    void action(client)
      .then(data => {
        setState({status: "success", data})
      })
      .catch((error: Error) => {
        setState({status: "error", error})
      })
  }, [action, client])

  return {state, execute, reinvokeAction}
}

export default useMatrixAsyncValue
