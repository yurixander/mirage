import {type RoomType} from "@/components/Room"
import {useEffect, useState} from "react"
import useConnection from "./useConnection"
import {getAllJoinedRooms} from "@/utils/rooms"
import {getRoomsFromSpace} from "@/utils/spaces"

export enum RoomsState {
  Loaded,
  Loading,
  Error,
}

export type PartialRoom = {
  roomId: string
  roomName: string
  type: RoomType
}

const useSpaceHierarchy = (spaceId: string | undefined) => {
  const {client} = useConnection()
  const [roomsState, setRoomsState] = useState<RoomsState>()
  const [rooms, setRooms] = useState<PartialRoom[]>([])

  useEffect(() => {
    if (client === null) {
      return
    }

    setRoomsState(RoomsState.Loading)

    const handler = setTimeout(() => {
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
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [client, spaceId])

  return {rooms, isLoading: roomsState === RoomsState.Loading}
}

export default useSpaceHierarchy
