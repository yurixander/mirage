import type {MatrixClient} from "matrix-js-sdk"
import {useCallback} from "react"
import useMatrixClient from "./useMatrixClient"

function useMatrixAction<T>(
  action: (client: MatrixClient) => Promise<T> | T
): (() => Promise<T | null>) | null {
  const client = useMatrixClient()

  const perform = useCallback(async () => {
    if (client === null) {
      return null
    }

    return await action(client)
  }, [action, client])

  // Provide the action if the client is available.
  // This is useful because it forces the consumer to handle
  // the case where the client is not available. For example,
  // if they have a button associated with the action, they
  // can disable the button if the client is not available.
  return client === null ? null : perform
}

export default useMatrixAction
