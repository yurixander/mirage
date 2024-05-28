import {UserPowerLevel} from "@/containers/Roster/RosterUser"
import useConnection from "../../../hooks/matrix/useConnection"
import {useEffect, useState, useCallback} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {getRoomMembers} from "@/utils/rooms"
import {type MemberSection} from "@/containers/Roster/MemberList"
import {type Room} from "matrix-js-sdk"

const useRoomMembers = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
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
    if (
      !isMountedReference.current ||
      client === null ||
      activeRoomId === null
    ) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom) {
      void fetchRoomMembers(activeRoom)
    }
  }, [activeRoomId, client, fetchRoomMembers, isMountedReference])

  return {
    sections,
    isMemberLoading,
    isInitiallyActive: activeRoomId !== null,
  }
}

export default useRoomMembers
