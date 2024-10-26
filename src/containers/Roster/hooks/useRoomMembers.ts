import {useEffect, useCallback} from "react"
import {getRoomMembers} from "@/utils/rooms"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"
import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {
  getOwnersWithLevelsMap,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {getImageUrl} from "@/utils/util"
import {type Room} from "matrix-js-sdk"

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

function processMember(
  memberId: string,
  room: Room,
  powerLevel: UserPowerLevel
): RosterUserData | null {
  const member = room.getMember(memberId)

  if (member === null) {
    return null
  }

  return {
    displayName: member.name,
    userId: member.userId,
    avatarUrl: getImageUrl(member.getMxcAvatarUrl(), room.client),
    lastPresenceAge: member.getLastModifiedTime(),
    powerLevel,
  }
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
    if (client === null || roomId === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setState({status: "error", error: new Error("Active room is null.")})

      return
    }

    const ownersWithLevelsMap = getOwnersWithLevelsMap(activeRoom)

    const membersResult: GroupedMembers = {
      admins: [],
      moderators: [],
      members: activeRoom
        .getMembers()
        .filter(member => !ownersWithLevelsMap.has(member.userId))
        .map(member => {
          return {
            displayName: member.name,
            userId: member.userId,
            powerLevel: processPowerLevelByNumber(member.powerLevelNorm),
            avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
            lastPresenceAge: member.getLastModifiedTime(),
          }
        }),
    }

    for (const [ownerId, powerLevel] of ownersWithLevelsMap) {
      const member = processMember(ownerId, activeRoom, powerLevel)

      if (member === null) {
        continue
      }

      if (powerLevel === UserPowerLevel.Admin) {
        membersResult.admins.push(member)
      } else {
        membersResult.moderators.push(member)
      }
    }

    setState({status: "success", data: membersResult})
  }, [client, roomId, setState])

  const onLazyReload = useCallback(() => {}, [])

  return {
    onLazyReload,
    membersState: state,
    onReloadMembers: loadMembers,
  }
}

export default useRoomMembers
