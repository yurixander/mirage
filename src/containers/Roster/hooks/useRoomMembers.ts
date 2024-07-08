import useConnection from "../../../hooks/matrix/useConnection"
import {useEffect, useState, useCallback} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {getRoomMembers} from "@/utils/rooms"
import {type MemberSection} from "@/containers/Roster/MemberList"
import {type Room} from "matrix-js-sdk"
import {UserPowerLevel} from "@/utils/members"

const useRoomMembers = (roomId: string) => {
  const {client} = useConnection()
  const isMountedReference = useIsMountedRef()
  const [sections, setSections] = useState<MemberSection[]>([])
  const [isMemberLoading, setMemberLoading] = useState(false)

  const fetchRoomMembers = useCallback(
    async (activeRoom: Room) => {
      setMemberLoading(true)

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
        console.error("Error fetching room members:", error)
      } finally {
        if (isMountedReference.current) {
          setMemberLoading(false)
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
      return
    }

    void fetchRoomMembers(activeRoom)
  }, [client, fetchRoomMembers, isMountedReference, roomId])

  return {
    sections,
    isMemberLoading,
  }
}

export default useRoomMembers
