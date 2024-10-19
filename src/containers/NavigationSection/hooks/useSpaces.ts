import {useCallback, useEffect} from "react"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getImageUrl} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {getJoinedSpaces} from "@/utils/spaces"
import useAsyncState, {type AsyncState} from "@/hooks/util/useAsyncState"

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
  spaces: AsyncState<PartialSpace[]>
  onSpaceExit: (spaceId: string) => void
}

const useSpaces = (): UseSpacesReturnType => {
  const client = useMatrixClient()
  const [spaces, setSpacesState] = useAsyncState<PartialSpace[]>()

  useEffect(() => {
    if (client === null) {
      return
    }

    void getJoinedSpaces(client)
      .then(joinedSpaces => {
        setSpacesState({
          status: "success",
          data: joinedSpaces.map(element => processSpace(element)),
        })
      })
      .catch(error => {
        setSpacesState({status: "error", error})
      })
  }, [client, setSpacesState])

  const onSpaceExit = useCallback(
    (spaceId: string) => {
      if (client === null) {
        return
      }

      void client.leave(spaceId)
    },
    [client]
  )

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || room === undefined) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return {
          status: "success",
          data: [processSpace(room)],
        }
      }

      return {status: "success", data: [...prev.data, processSpace(room)]}
    })
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return {
          status: "success",
          data: [processSpace(room)],
        }
      }

      const index = prev.data.findIndex(space => space.spaceId === room.roomId)

      if (index === -1) {
        return prev
      }

      const newSpaces = [...prev.data]
      newSpaces[index] = processSpace(room)

      return {
        status: "success",
        data: newSpaces,
      }
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

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return prev
      }

      return {
        status: "success",
        data: prev.data.filter(space => space.spaceId !== room.roomId),
      }
    })
  })

  return {spaces, onSpaceExit}
}

export default useSpaces
