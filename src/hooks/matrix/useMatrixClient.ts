import {type MatrixClient, SyncState} from "matrix-js-sdk"
import {useClientStore} from "./useConnection"

const useMatrixClient = (): MatrixClient | null => {
  const {client, isConnecting, syncState} = useClientStore()

  return client === null ||
    isConnecting ||
    syncState !== SyncState.Prepared ||
    !client.isLoggedIn()
    ? null
    : client
}

export default useMatrixClient
