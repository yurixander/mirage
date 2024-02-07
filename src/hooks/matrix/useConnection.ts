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
  const [isConnected, setIsConnected] = useState(false)

  const connect = useCallback(
    async ({baseUrl, accessToken, userId}: Credentials) => {
      if (clientSingleton !== null) {
        if (clientSingleton.isLoggedIn()) {
          await clientSingleton.startClient({
            lazyLoadMembers: true,
            initialSyncLimit: 1,
          })
          setIsConnected(true)
        }

        return
      }

      clientSingleton = createClient({baseUrl, accessToken, userId})

      // TODO: Handle errors.
      await clientSingleton.startClient({
        lazyLoadMembers: true,
        initialSyncLimit: 1,
      })

      setIsConnected(true)
    },
    []
  )

  const disconnect = useCallback(async () => {
    if (clientSingleton === null) {
      return
    }

    clientSingleton.stopClient()
    setIsConnected(false)
  }, [])

  const checkConnection = async (
    onPreparedCallback: (client: MatrixClient) => void
  ) => {
    clientSingleton?.once(ClientEvent.Sync, (state, _syncState, res) => {
      if (state === SyncState.Error) {
        void disconnect()

        throw new Error(`Sync error: ${res?.error?.message}`)
      } else if (state === SyncState.Prepared) {
        if (clientSingleton === null) {
          return
        }

        onPreparedCallback(clientSingleton)
      }
    })
  }

  return {
    // TODO: Use assertion that the singleton must be defined if is connected.
    client: isConnected ? clientSingleton : null,
    isConnected,
    connect,
    disconnect,
    checkConnection,
  }
}

export default useConnection
