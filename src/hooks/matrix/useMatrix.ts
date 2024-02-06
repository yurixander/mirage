import {type MatrixClient} from "matrix-js-sdk"
import useConnection from "./useConnection"
import {useCallback} from "react"

function useMatrix<T>(action: (client: MatrixClient) => Promise<T> | T) {
  const {client, isConnected} = useConnection()

  const perform = useCallback(async () => {
    if (client === null || !isConnected) {
      return null
    }

    return await action(client)
  }, [client, isConnected, action])

  return perform
}

export default useMatrix
