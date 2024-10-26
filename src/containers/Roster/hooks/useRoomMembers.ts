import {useEffect, useCallback} from "react"
import {getRoomMembers} from "@/utils/rooms"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"
import useValueState, {type ValueState} from "@/hooks/util/useValueState"

export type GroupedMembers = {
  admins: RosterUserData[]
  moderators: RosterUserData[]
  members: RosterUserData[]
}

export type UseRoomMembersReturnType = {
  membersState: ValueState<GroupedMembers>
  onLazyReload: () => void
  onReloadMembers: () => void
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const [state, setState] = useValueState<GroupedMembers>()

  const loadMembers = useCallback(() => {
    if (client === null || roomId === null) {
      return
    }

    setState({status: "loading"})

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setState({status: "error", error: new Error("Active room is null.")})

      return
    }

    getRoomMembers(activeRoom)
      .then(groupedMembers => {
        setState({status: "success", data: groupedMembers})
      })
      .catch((error: Error) => {
        setState({status: "error", error})
      })
  }, [client, roomId, setState])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  const onLazyReload = useCallback(() => {
    console.log("Lazy load")
  }, [])

  return {
    onLazyReload,
    membersState: state,
    onReloadMembers: loadMembers,
  }
}

export default useRoomMembers
