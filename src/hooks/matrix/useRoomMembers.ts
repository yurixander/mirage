import {UserPowerLevel} from "@/containers/Roster/RosterUser"
import useConnection from "./useConnection"
import {useEffect, useState} from "react"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {getRoomMembers} from "@/utils/rooms"
import {type MemberSection} from "@/containers/Roster/MemberList"

const useRoomMembers = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const isMountedReference = useIsMountedRef()
  const [sections, setSections] = useState<MemberSection[]>([])
  const [isMemberLoading, setMemberLoading] = useState(false)

  useEffect(() => {
    if (
      !isMountedReference.current ||
      client === null ||
      activeRoomId === null
    ) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    setMemberLoading(true)

    void getRoomMembers(activeRoom).then(newMembers => {
      setSections([
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
      ])

      setMemberLoading(false)
    })
  }, [activeRoomId, client, isMountedReference])

  return {sections, isMemberLoading}
}

export default useRoomMembers
