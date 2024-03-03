import {type RosterUserProps} from "@/components/RosterUser"
import {useActiveRoomIdStore} from "./useActiveRoom"
import useConnection from "./useConnection"
import {useCallback, useEffect, useState} from "react"
import {getRoomMembers} from "@/utils/util"

const useRoomMembers = () => {
  const {client} = useConnection()
  const {activeRoomId} = useActiveRoomIdStore()
  const [members, setMembers] = useState<RosterUserProps[]>([])

  const fetchRoomMembers = useCallback(async () => {
    if (client === null || activeRoomId === null) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    setMembers([])
    const newMembers = await getRoomMembers(client, activeRoom)
    setMembers(newMembers)
  }, [activeRoomId, client])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const activeRoom = client.getRoom(activeRoomId)

    if (activeRoom === null) {
      return
    }

    setMembers([])

    void getRoomMembers(client, activeRoom).then(newMembers => {
      setMembers(newMembers)
    })
  }, [activeRoomId, client, fetchRoomMembers])

  return {members}
}

export default useRoomMembers
