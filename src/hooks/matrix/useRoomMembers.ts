import {
  UserPowerLevel,
  type RosterUserProps,
} from "@/containers/Roster/RosterUser"
import useConnection from "./useConnection"
import {useCallback, useEffect, useState} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {getRoomMembers} from "@/utils/rooms"
import {type MemberSection} from "@/containers/Roster/MemberList"

const useRoomMembers = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const isMountedReference = useIsMountedRef()
  const [sections, setSections] = useState<MemberSection[]>([])

  const fetchRoomMembers = useCallback(async () => {
    if (client === null || activeRoomId === null) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    setSections([])

    const newMembers = await getRoomMembers(client, activeRoom)

    const admins: RosterUserProps[] = []
    const moderators: RosterUserProps[] = []
    const members: RosterUserProps[] = []

    for (const newMember of newMembers) {
      switch (newMember.powerLevel) {
        case UserPowerLevel.Admin: {
          admins.push(newMember)

          break
        }
        case UserPowerLevel.Moderator: {
          moderators.push(newMember)

          break
        }
        case UserPowerLevel.Member: {
          members.push(newMember)
        }
      }
    }

    const newSections: MemberSection[] = []

    if (admins.length > 0) {
      newSections.push({title: "Admin", users: admins})
    }

    if (moderators.length > 0) {
      newSections.push({title: "Moderators", users: moderators})
    }

    if (members.length > 0) {
      newSections.push({title: "Member", users: members})
    }

    setSections(newSections)
  }, [activeRoomId, client])

  useEffect(() => {
    if (!isMountedReference.current) {
      return
    }

    void fetchRoomMembers()
  }, [fetchRoomMembers, isMountedReference])

  return {sections}
}

export default useRoomMembers
