import {type RosterUserProps} from "@/components/RosterUser"
import useConnection from "./useConnection"
import {useCallback, useEffect, useState} from "react"
import {getRoomMembers} from "@/utils/util"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

const useRoomMembers = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const [members, setMembers] = useState<RosterUserProps[]>([])
  const isMountedRef = useIsMountedRef()

  const fetchRoomMembers = useCallback(async () => {
    if (client === null || activeRoomId === null) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    const newMembers = await getRoomMembers(client, activeRoom)

    setMembers(newMembers)
  }, [activeRoomId, client])

  useEffect(() => {
    if (client === null || activeRoomId === null || !isMountedRef.current) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    void getRoomMembers(client, activeRoom).then(newMembers => {
      if (isMountedRef.current) {
        setMembers(newMembers)
      }
    })
  }, [activeRoomId, client, fetchRoomMembers, isMountedRef])

  return {members}
}

export default useRoomMembers
