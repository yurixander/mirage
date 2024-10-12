import {useCallback, useEffect, useState} from "react"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getImageUrl} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {getJoinedSpaces} from "@/utils/spaces"

export type PartialSpace = {
  name: string
  spaceId: string
  avatarUrl?: string
}

const processSpace = (space: Room): PartialSpace => {
  return {
    name: space.name,
    spaceId: space.roomId,
    avatarUrl: getImageUrl(space.getMxcAvatarUrl(), space.client),
  }
}

type UseSpacesReturnType = {
  spaces: PartialSpace[]
  isLoading: boolean
  onSpaceExit: (spaceId: string) => void
}

const useSpaces = (): UseSpacesReturnType => {
  const client = useMatrixClient()
  const [isLoading, setIsLoading] = useState(true)
  const [spaces, setSpaces] = useState<PartialSpace[]>([])

  const onSpaceExit = useCallback(
    (spaceId: string) => {
      if (client === null) {
        return
      }

      void client.leave(spaceId)
    },
    [client]
  )

  useEffect(() => {
    if (client === null) {
      return
    }

    try {
      void getJoinedSpaces(client).then(spaces => {
        setSpaces(spaces.map(element => processSpace(element)))
      })

      setIsLoading(false)
    } catch (error) {
      // TODO: Show toast when error ocurred.

      console.error("Error fetching spaces", error)

      setIsLoading(false)
    }
  }, [client])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || room === undefined) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    setSpaces(prev => [...prev, processSpace(room)])
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    setSpaces(prev => {
      const index = prev.findIndex(space => space.spaceId === room.roomId)

      if (index === -1) {
        return prev
      }

      const newSpaces = [...prev]
      newSpaces[index] = processSpace(room)

      return newSpaces
    })
  })

  useEventListener(RoomEvent.MyMembership, (room, membership) => {
    if (
      membership !== KnownMembership.Leave &&
      membership !== KnownMembership.Ban
    ) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    setSpaces(prev => prev.filter(space => space.spaceId !== room.roomId))
  })

  return {spaces, onSpaceExit, isLoading}
}

export default useSpaces
