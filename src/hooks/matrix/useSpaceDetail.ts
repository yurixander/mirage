import {useEffect, useState} from "react"
import useMatrixClient from "./useMatrixClient"

type SpaceDetail = {
  name: string | undefined
}

const useSpaceDetail = (spaceId: string): SpaceDetail => {
  const client = useMatrixClient()
  const [spaceName, setSpaceName] = useState<string>()

  useEffect(() => {
    if (client === null) {
      return
    }

    const space = client.getRoom(spaceId)

    if (space === null || !space.isSpaceRoom()) {
      return
    }

    setSpaceName(space.name)
  }, [client, spaceId])

  return {
    name: spaceName,
  }
}

export default useSpaceDetail
