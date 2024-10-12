import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {useCallback, useEffect, useState} from "react"
import {EMPTY_SECTIONS, type RoomSections} from "../RoomNavigator"
import {RoomType} from "@/components/Room"
import {getAllJoinedRooms} from "@/utils/rooms"
import {EventType, type MatrixClient, type Room, RoomEvent} from "matrix-js-sdk"
import useRoomListener from "@/hooks/matrix/useRoomListener"
import {getSpaceRoomSections} from "@/utils/spaces"

type UseRoomNavigatorReturnType = {
  isSectionsLoading: boolean
  sections: RoomSections
}

const useRoomNavigator = (
  spaceId: string | undefined
): UseRoomNavigatorReturnType => {
  const client = useMatrixClient()
  const [activeSpace, setActiveSpace] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sections, setSections] = useState<RoomSections>(EMPTY_SECTIONS)

  useEffect(() => {
    if (client === null || spaceId === undefined) {
      return
    }

    setActiveSpace(client.getRoom(spaceId))
  }, [client, spaceId])

  const onLoadSections = useCallback(
    async (client: MatrixClient, spaceId?: string) => {
      if (spaceId === undefined) {
        const joinedRooms = await getAllJoinedRooms(client)

        setSections({
          recommended: [],
          directs: joinedRooms.filter(room => room.type === RoomType.Direct),
          groups: joinedRooms.filter(room => room.type === RoomType.Group),
        })

        return
      }

      const spaceRoomSections = await getSpaceRoomSections(spaceId, client)

      setSections(spaceRoomSections ?? EMPTY_SECTIONS)
    },
    []
  )

  useEffect(() => {
    if (client === null) {
      return
    }

    setIsLoading(true)

    void onLoadSections(client, spaceId)
      .catch(error => {
        console.error(`Error when sections is loading, ${error}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [client, onLoadSections, spaceId])

  // TODO: Handle space listener for see when room is removed from space.
  useRoomListener(activeSpace, RoomEvent.Timeline, event => {
    if (event.getType() !== EventType.SpaceChild || client === null) {
      return
    }

    void onLoadSections(client, spaceId)
  })

  return {
    isSectionsLoading: isLoading || client === null,
    sections,
  }
}

export default useRoomNavigator
