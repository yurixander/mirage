import {useCallback, useEffect, useState} from "react"
import {getSpaceRoomSections} from "@/utils/spaces"
import {type Room, RoomEvent, type MatrixClient, EventType} from "matrix-js-sdk"
import useRoomListener from "./useRoomListener"
import useMatrixClient from "./useMatrixClient"
import {
  EMPTY_SECTIONS,
  type RoomSections,
} from "@/containers/NavigationSection/RoomNavigator"
import {RoomType} from "@/containers/NavigationSection/hooks/useRoomNavigator"

export type PartialRoom = {
  roomId: string
  roomName: string
  emoji: string
  type: RoomType
}

type UseSpaceHierarchyReturnType = {
  isHierarchyLoading: boolean
  hierarchySections: RoomSections
}

const useSpaceHierarchy = (spaceId: string): UseSpaceHierarchyReturnType => {
  const client = useMatrixClient()
  const [activeSpace, setActiveSpace] = useState<Room | null>(null)
  const [hierarchySections, setHierarchySections] = useState(EMPTY_SECTIONS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (client === null || spaceId === undefined) {
      return
    }

    setActiveSpace(client.getRoom(spaceId))
  }, [client, spaceId])

  const fetchSpaceHierarchy = useCallback(
    (client: MatrixClient) => {
      if (spaceId === undefined) {
        setHierarchySections(EMPTY_SECTIONS)
        setIsLoading(false)

        return
      }

      setActiveSpace(client.getRoom(spaceId))

      void getSpaceRoomSections(spaceId, client)
        .then(sections => {
          if (sections === null) {
            setHierarchySections(EMPTY_SECTIONS)

            return
          }

          setHierarchySections(sections)
        })
        .catch(error => {
          console.error("Failed to load child rooms from space.", error)

          setHierarchySections(EMPTY_SECTIONS)
        })

      setIsLoading(false)
    },
    [spaceId]
  )

  const onRefreshRooms = (): void => {
    if (client === null) {
      return
    }

    fetchSpaceHierarchy(client)
  }

  useEffect(() => {
    if (client === null) {
      return
    }

    setIsLoading(true)

    const handler = setTimeout(() => {
      fetchSpaceHierarchy(client)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [client, fetchSpaceHierarchy])

  // TODO: Handle space listener for see when room is removed from space.
  useRoomListener(activeSpace, RoomEvent.Timeline, event => {
    if (event.getType() !== EventType.SpaceChild || client === null) {
      return
    }

    onRefreshRooms()
  })

  return {
    isHierarchyLoading: isLoading,
    hierarchySections,
  }
}

export default useSpaceHierarchy
