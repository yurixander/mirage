import {type Credentials} from "@/utils/util"
import {type MatrixClient, createClient} from "matrix-js-sdk"
import {useCallback, useState} from "react"

let clientSingleton: MatrixClient | null = null

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(false)

  const connect = useCallback(
    async ({baseUrl, accessToken, userId}: Credentials) => {
      if (clientSingleton !== null) {
        if (clientSingleton.isLoggedIn()) {
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

  return {
    // TODO: Use assertion that the singleton must be defined if is connected.
    client: isConnected ? clientSingleton : null,
    isConnected,
    connect,
    disconnect,
  }
}

export default useConnection
