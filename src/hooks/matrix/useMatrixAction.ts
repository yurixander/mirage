import {type MatrixClient} from "matrix-js-sdk"
import useClient from "./useClient"
import {useCallback} from "react"

function useMatrixAction<T>(action: (client: MatrixClient) => Promise<T> | T) {
  const {client, isConnected} = useClient()

  const perform = useCallback(async () => {
    if (client === null || !isConnected) {
      return null
    }

    return await action(client)
  }, [client, isConnected, action])

  return perform
}

export default useMatrixAction
