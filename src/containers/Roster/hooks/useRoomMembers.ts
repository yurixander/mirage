import {useEffect, useState, useCallback} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {getRoomMembers} from "@/utils/rooms"
import {type Room} from "matrix-js-sdk"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"

export type UseRoomMembersReturnType = {
  members: RosterUserData[]
  isMembersLoading: boolean
  isMembersError: boolean
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const isMountedReference = useIsMountedRef()
  const [members, setMembers] = useState<RosterUserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchRoomMembers = useCallback(
    async (activeRoom: Room) => {
      setIsLoading(true)

      try {
        const newMembers = await getRoomMembers(activeRoom)

        if (isMountedReference.current) {
          setMembers(newMembers)

          setIsLoading(false)
        }
      } catch (error) {
        setIsError(true)
        setIsLoading(false)

        console.error("Error fetching room members:", error)
      }
    },
    [isMountedReference]
  )

  useEffect(() => {
    if (!isMountedReference.current || client === null || roomId === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setIsError(true)
      setIsLoading(false)

      return
    }

    void fetchRoomMembers(activeRoom)
  }, [client, fetchRoomMembers, isMountedReference, roomId])

  return {
    members,
    isMembersLoading: isLoading,
    isMembersError: isError,
  }
}

export default useRoomMembers
