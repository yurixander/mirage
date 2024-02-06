import useMatrixQuery from "@/hooks/matrix/useMatrixQuery"
import {useCallback} from "react"

const useRooms = () => {
  const rooms = useMatrixQuery(
    useCallback(client => {
      if (!client.isLoggedIn()) {
        return null
      }

      return Object.values(client.getRooms())
    }, [])
  )

  return {rooms}
}

export default useRooms
