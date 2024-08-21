import {useCallback, useEffect, useState} from "react"
import useList from "../../../hooks/util/useList"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getImageUrl} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"

export type PartialSpace = {
  name: string
  spaceId: string
  avatarUrl?: string
}

const hasSpaceRepeat = (space1: PartialSpace, space2: PartialSpace): boolean =>
  space1.spaceId === space2.spaceId

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
  const [isLoading, setIsLoading] = useState(false)

  const {
    items: spaces,
    addItem: addSpace,
    updateItem: updateSpace,
    deleteWhen: deleteSpaceWhen,
  } = useList<PartialSpace>(hasSpaceRepeat)

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
    const handler = setTimeout(() => {
      if (client === null) {
        return
      }

      setIsLoading(true)

      try {
        for (const room of client.getRooms()) {
          if (!room.isSpaceRoom()) {
            continue
          }

          addSpace(processSpace(room))
        }
      } catch (error) {
        // TODO: Show toast when error ocurred.

        console.error("Error fetching spaces", error)
      }

      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [addSpace, client])

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || room === undefined) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    addSpace(processSpace(room))
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    updateSpace(processSpace(room))
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

    deleteSpaceWhen(spaceIter => spaceIter.spaceId === room.roomId)
  })

  return {spaces, onSpaceExit, isLoading: isLoading || client === null}
}

export default useSpaces
