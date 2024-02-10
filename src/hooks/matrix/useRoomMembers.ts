import {useEffect, useState} from "react"
import useConnection from "./useConnection"
import {type RoomMember} from "matrix-js-sdk"

const useRoomMembers = (roomId?: string) => {
  const [members, setMembers] = useState<RoomMember[] | undefined>()
  const {client, syncState} = useConnection()

  useEffect(() => {
    if (client === null) {
      console.info("Client is null; cannot fetch rooms.")

      return
    }

    const room = client.getRoom(roomId)
    setMembers(room?.getMembers())
  }, [client, roomId, syncState])

  return {members}
}

export default useRoomMembers
