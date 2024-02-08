import {type Credentials} from "@/utils/util"
import {
  type MatrixClient,
  createClient,
  ClientEvent,
  SyncState,
} from "matrix-js-sdk"
import {useCallback, useState} from "react"

let clientSingleton: MatrixClient | null = null

export enum ConnectionStatus {
  Disconnected,
  Connecting,
  Connected,
}

const useConnection = () => {
  const [isSynced, setIsSynced] = useState(false)
  const [syncError, setSyncError] = useState<Error | null>(null)

  const connect = useCallback(
    async (credentials: Credentials): Promise<boolean> => {
      return await new Promise(resolve => {
        // The client is already connected; do nothing.
        if (clientSingleton !== null && clientSingleton.isLoggedIn()) {
          return
        }

        setSyncError(null)
        clientSingleton = createClient(credentials)

        // NOTE: No need to remove the listener, as the client is a singleton.
        clientSingleton.once(
          ClientEvent.Sync,
          (syncState, _previousSyncState, data) => {
            alert("Sync state: " + syncState)

            if (syncState === SyncState.Error) {
              setSyncError(data?.error ?? new Error("Unknown sync error"))
              resolve(false)
            } else if (syncState === SyncState.Prepared) {
              setIsSynced(true)
              resolve(true)
            }
          }
        )

        // REVIEW: Is this relevant? Also, the error is caught by Matrix here. Need to call `reject`. This needs more experimentation.
        clientSingleton.once(ClientEvent.SyncUnexpectedError, () => {
          throw new Error("Unexpected sync error.")
        })

        // TODO: Add disconnect listener for when the client disconnects during operation, and if supported, reconnect listener as well.

        // NOTE: No need to await the promise, as the client will
        // emit events when it is connected or when it fails to connect
        // via the client sync event above.
        // TODO: Handle connection errors (`.catch`).
        void clientSingleton.startClient({
          lazyLoadMembers: true,
          initialSyncLimit: 1,
        })
      })
    },
    [setSyncError, setIsSynced]
  )

  const disconnect = useCallback(async () => {
    if (clientSingleton === null || !isSynced) {
      return
    }

    setIsSynced(false)
    clientSingleton.stopClient()
  }, [isSynced, setIsSynced])

  return {
    // TODO: Use assertion that the singleton must be defined if is connected.
    // Only provide the client if it is both connected and synced.
    client: isSynced ? clientSingleton : null,
    isSynced,
    connect,
    disconnect,
    syncError,
  }
}

export default useConnection
