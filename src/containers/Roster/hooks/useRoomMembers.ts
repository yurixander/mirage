import {useEffect, useCallback, useState} from "react"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"
import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {
  getOwnersWithLevelsMap,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {getImageUrl} from "@/utils/util"

export type GroupedMembers = {
  admins: RosterUserData[]
  moderators: RosterUserData[]
  members: RosterUserData[]
}

export type UseRoomMembersReturnType = {
  isLazyLoading: boolean
  membersState: ValueState<GroupedMembers>
  onLazyReload: () => void
  onReloadMembers: () => void
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const [state, setState] = useValueState<GroupedMembers>()
  const [isLazyLoading, setIsLazyLoading] = useState(false)

  const loadMembers = useCallback(async () => {
    if (client === null || roomId === null) {
      return
    }

    setState({status: "loading"})

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setState({status: "error", error: new Error("Active room is null.")})

      return
    }

    const ownersWithLevelsMap = getOwnersWithLevelsMap(activeRoom)
    const joinedMembers = await client.getJoinedRoomMembers(activeRoom.roomId)

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
      const member = joinedMembers.joined[ownerId]

      if (member === undefined) {
        continue
      }

      if (powerLevel === UserPowerLevel.Admin) {
        membersResult.admins.push({
          displayName: member.display_name,
          userId: ownerId,
          avatarUrl: getImageUrl(member.avatar_url, client),
          powerLevel,
        })
      } else {
        membersResult.moderators.push({
          displayName: member.display_name,
          userId: ownerId,
          avatarUrl: getImageUrl(member.avatar_url, client),
          powerLevel,
        })
      }
    }

    setState({status: "success", data: membersResult})
  }, [client, roomId, setState])

  useEffect(() => {
    void loadMembers()
  }, [loadMembers])

  const onLazyReload = useCallback(() => {
    if (client === null || roomId === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setState({status: "error", error: new Error("Active room is null.")})

      return
    }

    const ownersWithLevelsMap = getOwnersWithLevelsMap(activeRoom)

    setIsLazyLoading(true)

    void activeRoom
      .loadMembersIfNeeded()
      .then(isNeeded => {
        if (!isNeeded) {
          return
        }

        setState(prevState => {
          if (prevState.status !== "success") {
            return prevState
          }

          return {
            status: "success",
            data: {
              admins: prevState.data.admins,
              moderators: prevState.data.moderators,
              members: [
                ...prevState.data.members,
                ...activeRoom
                  .getMembers()
                  .filter(
                    member =>
                      !ownersWithLevelsMap.has(member.userId) &&
                      member.isOutOfBand()
                  )
                  .map(member => {
                    return {
                      displayName: member.name,
                      userId: member.userId,
                      powerLevel: processPowerLevelByNumber(
                        member.powerLevelNorm
                      ),
                      avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
                      lastPresenceAge: member.getLastModifiedTime(),
                    }
                  }),
              ],
            },
          }
        })
      })
      .finally(() => {
        setIsLazyLoading(false)
      })
  }, [client, roomId, setState])

  return {
    onLazyReload,
    membersState: state,
    isLazyLoading,
    onReloadMembers: () => {
      void loadMembers()
    },
  }
}

export default useRoomMembers
