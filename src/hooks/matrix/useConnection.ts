import {type Credentials} from "@/utils/util"
import {
  type MatrixClient,
  createClient,
  ClientEvent,
  SyncState,
} from "matrix-js-sdk"
import {useCallback} from "react"
import {create} from "zustand"

type ZustandClientStore = {
  client: MatrixClient | null
  syncState: SyncState | null
  lastSyncError: Error | null
  setClient: (client: MatrixClient) => void
  setSyncState: (syncState: SyncState) => void
  setLastSyncError: (error: Error | null) => void
}

const useClientStore = create<ZustandClientStore>(set => ({
  client: null,
  syncState: null,
  lastSyncError: null,
  setClient: (client: MatrixClient) => {
    set({client})
  },
  setSyncState: (syncState: SyncState) => {
    set({syncState})
  },
  setLastSyncError: (error: Error | null) => {
    set({lastSyncError: error})
  },
}))

const useConnection = () => {
  const {
    client,
    setClient,
    syncState,
    setSyncState,
    lastSyncError,
    setLastSyncError,
  } = useClientStore()

  const connect = useCallback(
    async (credentials: Credentials): Promise<boolean> => {
      // The client is already connected or is in the process of
      // connecting; don't attempt another connection.
      if (![SyncState.Stopped, SyncState.Error, null].includes(syncState)) {
        return true
      }

      return await new Promise(resolve => {
        setLastSyncError(null)

        const newClient = createClient(credentials)

        // NOTE: No need to remove the listener, as the client is a singleton.
        newClient.once(
          ClientEvent.Sync,
          (syncState, _previousSyncState, data) => {
            setSyncState(syncState)

            if (syncState === SyncState.Error) {
              const error = data?.error ?? new Error("Unknown sync error")

              setLastSyncError(error)
              resolve(false)
            } else if (syncState === SyncState.Prepared) {
              resolve(true)
            }
          }
        )

        // REVIEW: Is this relevant? Also, the error is caught by Matrix here. Need to call `reject`. This needs more experimentation.
        newClient.once(ClientEvent.SyncUnexpectedError, () => {
          throw new Error("Unexpected sync error.")
        })

        // TODO: Add disconnect listener for when the client disconnects during operation, and if supported, reconnect listener as well.

        setClient(newClient)

        // NOTE: No need to await the promise, as the client will
        // emit events when it is connected or when it fails to connect
        // via the client sync event above.
        // TODO: Handle connection errors (`.catch`).
        void newClient.startClient({
          lazyLoadMembers: true,
          initialSyncLimit: 1,
        })
      })
    },
    [setClient, setLastSyncError, setSyncState, syncState]
  )

  const disconnect = useCallback(async () => {
    if (client === null || client.getSyncState() === SyncState.Stopped) {
      return
    }

    client.stopClient()
  }, [client])

  return {
    // TODO: Use assertion that the singleton must be defined if is connected.
    // Only provide the client if it is both connected and synced.
    client: syncState === SyncState.Prepared ? client : null,
    syncState,
    connect,
    disconnect,
    lastSyncError,
  }
}

export default useConnection
