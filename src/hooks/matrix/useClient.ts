import {MatrixClient} from "matrix-js-sdk"
import {useState} from "react"

let clientSingleton: MatrixClient | null = null

const useClient = () => {
  const [isConnected, setIsConnected] = useState(false)

  const connect = async (
    baseUrl: string,
    accessToken: string,
    userId: string
  ) => {
    if (clientSingleton === null) {
      return
    }

    clientSingleton = new MatrixClient({
      baseUrl,
      accessToken,
      userId,
    })

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
