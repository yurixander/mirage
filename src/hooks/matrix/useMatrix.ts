import {type MatrixClient} from "matrix-js-sdk"
import useConnection from "./useConnection"
import {useCallback} from "react"

function useMatrix<T>(action: (client: MatrixClient) => Promise<T> | T) {
  const {client} = useConnection()

  const perform = useCallback(async () => {
    if (client === null) {
      return null
    }

    return await action(client)
  }, [client, action])

  return perform
}

export default useMatrix
