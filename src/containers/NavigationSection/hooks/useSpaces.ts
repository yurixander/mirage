import {useCallback} from "react"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getImageUrl} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {getJoinedSpaces} from "@/utils/spaces"
import useMatrixAsyncValue, {
  type AsyncState,
} from "@/hooks/util/useMatrixAsyncValue"

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

  const {state: spaces, reinvokeAction} = useMatrixAsyncValue(async client => {
    const joinedSpaces = await getJoinedSpaces(client)

    return joinedSpaces.map(element => processSpace(element))
  })

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

    reinvokeAction()
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    reinvokeAction()
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

    reinvokeAction()
  })

  return {spaces, onSpaceExit}
}

export default useSpaces
