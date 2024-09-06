import {useEffect, useState, useCallback} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {getRoomMembers} from "@/utils/rooms"
import {type Room} from "matrix-js-sdk"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"

export type GroupedMembers = {
  admins: RosterUserData[]
  moderators: RosterUserData[]
  members: RosterUserData[]
}

export type UseRoomMembersReturnType = {
  groupedMembers: GroupedMembers
  isMembersLoading: boolean
  isMembersError: boolean
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const isMountedReference = useIsMountedRef()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [groupedMembers, setGroupedMembers] = useState<GroupedMembers>({
    admins: [],
    members: [],
    moderators: [],
  })

  const fetchRoomMembers = useCallback(
    async (activeRoom: Room) => {
      setIsLoading(true)

      try {
        const newGroupedMembers = await getRoomMembers(activeRoom)

        if (isMountedReference.current) {
          setGroupedMembers(newGroupedMembers)

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
    groupedMembers,
    isMembersLoading: isLoading,
    isMembersError: isError,
  }
}

export default useRoomMembers
