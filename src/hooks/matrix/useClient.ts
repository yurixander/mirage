import {type Credentials} from "@/utils/util"
import {type MatrixClient, createClient} from "matrix-js-sdk"
import {useState} from "react"

let clientSingleton: MatrixClient | null = null

const useClient = () => {
  const [isConnected, setIsConnected] = useState(false)

  const connect = async ({baseUrl, accessToken, userId}: Credentials) => {
    if (clientSingleton !== null) {
      if (clientSingleton.isLoggedIn()) {
        setIsConnected(true)
      }

      return
    }

    clientSingleton = createClient({baseUrl, accessToken, userId})

    // TODO: Handle errors.
    await clientSingleton.startClient()

    setIsConnected(true)
  }

  const disconnect = async () => {
    if (clientSingleton === null) {
      return
    }

    clientSingleton.stopClient()
    setIsConnected(false)
  }

  return {
    // TODO: Use assertion that the singleton must be defined if is connected.
    client: isConnected ? clientSingleton : null,
    isConnected,
    connect,
    disconnect,
  }
}

export default useClient
