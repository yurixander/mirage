import {type MatrixClient} from "matrix-js-sdk"
import useClient from "./useClient"

function useMatrix<T>(action: (client: MatrixClient) => Promise<T>) {
  const {client, isConnected} = useClient()

  const perform = async () => {
    if (client === null || !isConnected) {
      return null
    }

    return await action(client)
  }

  return perform
}

export default useMatrix
