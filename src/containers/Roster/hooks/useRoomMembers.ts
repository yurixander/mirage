import {useEffect, useState, useCallback} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {getRoomMembers} from "@/utils/rooms"
import {type MemberSection} from "@/containers/Roster/MemberList"
import {type Room} from "matrix-js-sdk"
import {UserPowerLevel} from "@/utils/members"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"

export type UseRoomMembersReturnType = {
  sections: MemberSection[]
  isMembersLoading: boolean
  isMembersError: boolean
}

enum MembersState {
  Idle,
  Loading,
  Error,
}

const useRoomMembers = (roomId: string): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const isMountedReference = useIsMountedRef()
  const [sections, setSections] = useState<MemberSection[]>([])
  const [membersState, setMembersState] = useState(MembersState.Idle)

  const fetchRoomMembers = useCallback(
    async (activeRoom: Room) => {
      setMembersState(MembersState.Loading)

      try {
        const newMembers = await getRoomMembers(activeRoom)

        const groupedMembers: MemberSection[] = [
          {
            title: "Admin",
            users: newMembers.filter(
              user => user.powerLevel === UserPowerLevel.Admin
            ),
          },
          {
            title: "Moderator",
            users: newMembers.filter(
              user => user.powerLevel === UserPowerLevel.Moderator
            ),
          },
          {
            title: "Member",
            users: newMembers.filter(
              user => user.powerLevel === UserPowerLevel.Member
            ),
          },
        ]

        if (isMountedReference.current) {
          setSections(groupedMembers)
        }
      } catch (error) {
        setMembersState(MembersState.Error)

        console.error("Error fetching room members:", error)
      } finally {
        if (isMountedReference.current) {
          setMembersState(MembersState.Idle)
        }
      }
    },
    [isMountedReference]
  )

  useEffect(() => {
    if (!isMountedReference.current || client === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setMembersState(MembersState.Error)

      return
    }

    void fetchRoomMembers(activeRoom)
  }, [client, fetchRoomMembers, isMountedReference, roomId])

  return {
    sections,
    isMembersLoading: membersState === MembersState.Loading,
    isMembersError: membersState === MembersState.Error,
  }
}

export default useRoomMembers
