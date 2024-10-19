import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {getRoomMembers} from "@/utils/rooms"
import type {Room} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import type {RosterUserData} from "../RosterUser"

export type GroupedMembers = {
  admins: RosterUserData[]
  moderators: RosterUserData[]
  members: RosterUserData[]
}

export type UseRoomMembersReturnType = {
  groupedMembers: GroupedMembers | Error
  isMembersLoading: boolean
  onReloadMembers: () => void
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const isMountedReference = useIsMountedRef()
  const [isLoading, setIsLoading] = useState(true)

  const [groupedMembers, setGroupedMembers] = useState<GroupedMembers | Error>({
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
        if (!(error instanceof Error)) {
          return
        }

        setIsLoading(false)
        setGroupedMembers(error)

        console.error("Error fetching room members:", error)
      }
    },
    [isMountedReference]
  )

  const loadMembers = useCallback(() => {
    if (!isMountedReference.current || client === null || roomId === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setGroupedMembers(new Error("Active room is null."))
      setIsLoading(false)

      return
    }

    void fetchRoomMembers(activeRoom)
  }, [client, fetchRoomMembers, isMountedReference, roomId])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  return {
    groupedMembers,
    isMembersLoading: isLoading,
    onReloadMembers: loadMembers,
  }
}

export default useRoomMembers
