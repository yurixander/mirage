import {type RoomType} from "@/components/Room"
import {useCallback, useEffect, useState} from "react"
import {getAllJoinedRooms} from "@/utils/rooms"
import {getRoomsFromSpace} from "@/utils/spaces"
import {type Room, RoomEvent, type MatrixClient, EventType} from "matrix-js-sdk"
import useRoomListener from "./useRoomListener"
import useMatrixClient from "./useMatrixClient"

export enum RoomsState {
  Loaded,
  Loading,
  Error,
}

export type PartialRoom = {
  roomId: string
  roomName: string
  emoji: string
  type: RoomType
}

type UseSpaceHierarchyReturnType = {
  rooms: PartialRoom[]
  roomsState: RoomsState
  client: MatrixClient | null
  onRefreshRooms: () => void
}

const useSpaceHierarchy = (
  spaceId: string | undefined
): UseSpaceHierarchyReturnType => {
  const client = useMatrixClient()
  const [roomsState, setRoomsState] = useState(RoomsState.Loading)
  const [rooms, setRooms] = useState<PartialRoom[]>([])
  const [activeSpace, setActiveSpace] = useState<Room | null>(null)

  const fetchSpaceHierarchy = useCallback(
    (client: MatrixClient) => {
      setActiveSpace(client.getRoom(spaceId))

      if (spaceId === undefined) {
        // If spaceId is not specified fetch all joined rooms.
        void getAllJoinedRooms(client)
          .then(joinedRooms => {
            setRooms(joinedRooms)

            setRoomsState(RoomsState.Loaded)
          })
          .catch(error => {
            console.error("Failed to load all rooms.", error)

            setRoomsState(RoomsState.Error)
          })

        return
      }

      void getRoomsFromSpace(spaceId, client)
        .then(roomsHierarchy => {
          setRooms(roomsHierarchy)

          setRoomsState(RoomsState.Loaded)
        })
        .catch(error => {
          console.error("Failed to load child rooms from space.", error)

          setRoomsState(RoomsState.Error)
        })
    },
    [spaceId]
  )

  const onRefreshRooms = (): void => {
    if (client === null) {
      return
    }

    setRoomsState(RoomsState.Loading)
    fetchSpaceHierarchy(client)
  }

  useEffect(() => {
    if (client === null) {
      return
    }

    setRoomsState(RoomsState.Loading)

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
    rooms,
    roomsState,
    onRefreshRooms,
    client,
  }
}

export default useSpaceHierarchy
