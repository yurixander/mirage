import {type MatrixClient} from "matrix-js-sdk"
import useClient from "./useClient"
import {useEffect, useState} from "react"

function useMatrixQuery<T>(fetcher: (client: MatrixClient) => Promise<T> | T) {
  const {client, isConnected} = useClient()
  const [data, setData] = useState<T | null>(null)

  // TODO: This should automatically/periodically refresh the data, not just once. May need to use something like RxJS for this.
  useEffect(() => {
    if (client === null || !isConnected) {
      return
    }

    const fetchData = async () => {
      setData(await fetcher(client))
    }

    void fetchData()
  }, [client, isConnected, fetcher])

  return data
}

export default useMatrixQuery
