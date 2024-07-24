import {type RoomType} from "@/components/Room"
import {useCallback, useEffect, useState} from "react"
import useConnection from "./useConnection"
import {getAllJoinedRooms} from "@/utils/rooms"
import {getRoomsFromSpace} from "@/utils/spaces"
import {type MatrixClient} from "matrix-js-sdk"

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
  const {client} = useConnection()
  const [roomsState, setRoomsState] = useState(RoomsState.Error)
  const [rooms, setRooms] = useState<PartialRoom[]>([])

  const fetchSpaceHierarchy = useCallback(
    (client: MatrixClient) => {
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

    setRoomsState(RoomsState.Error)

    const handler = setTimeout(() => {
      fetchSpaceHierarchy(client)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [client, fetchSpaceHierarchy])

  // TODO: Handle listeners for rooms.

  return {
    rooms,
    roomsState,
    onRefreshRooms,
    client,
  }
}

export default useSpaceHierarchy
