import {useEffect, useCallback, useState, useRef} from "react"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {type RosterUserData} from "../RosterUser"
import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {
  getUserLastPresence,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {type MatrixClient} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {getImageUrl} from "@/utils/matrix"

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

async function loadJoinedMembers(
  client: MatrixClient,
  roomId: string,
  isOutOfBand: boolean
): Promise<GroupedMembers> {
  const room = client.getRoom(roomId)

  if (room === null) {
    throw new Error("Room is not available")
  }

  const roomWIthLimit = await client.scrollback(room, 30)

  const members = room.getMembers()

  const groupedMembers: GroupedMembers = {
    admins: [],
    moderators: [],
    members: [],
  }

  for (const member of members) {
    if (
      member.isOutOfBand() === isOutOfBand ||
      member.membership !== KnownMembership.Join
    ) {
      continue
    }

    const lastPresenceAge =
      (await getUserLastPresence(roomWIthLimit, 30, member.userId)) ?? undefined

    const memberProcessed: RosterUserData = {
      displayName: member.name,
      userId: member.userId,
      powerLevel: processPowerLevelByNumber(member.powerLevelNorm),
      avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
      lastPresenceAge,
    }

    if (memberProcessed.powerLevel === UserPowerLevel.Admin) {
      groupedMembers.admins.push(memberProcessed)
    } else if (memberProcessed.powerLevel === UserPowerLevel.Moderator) {
      groupedMembers.moderators.push(memberProcessed)
    } else {
      groupedMembers.members.push(memberProcessed)
    }
  }

  return groupedMembers
}

const useRoomMembers = (roomId: string | null): UseRoomMembersReturnType => {
  const client = useMatrixClient()
  const isMountedRef = useRef(roomId)

  const [state, setState] = useValueState<GroupedMembers>()
  const [isLazyLoading, setIsLazyLoading] = useState(false)

  const loadMembers = useCallback(
    (client: MatrixClient, roomId: string) => {
      setState({status: "loading"})

      loadJoinedMembers(client, roomId, true)
        .then(membersResult => {
          if (isMountedRef.current === roomId) {
            setState({status: "success", data: membersResult})
          }
        })
        .catch((error: Error) => {
          if (isMountedRef.current === roomId) {
            setState({status: "error", error})
          }
        })
    },
    [setState]
  )

  useEffect(() => {
    isMountedRef.current = roomId
    setIsLazyLoading(false)

    if (client === null || roomId === null) {
      return
    }

    loadMembers(client, roomId)
  }, [client, loadMembers, roomId])

  const onLazyReload = useCallback(() => {
    if (client === null || roomId === null) {
      return
    }

    const activeRoom = client.getRoom(roomId)

    if (activeRoom === null) {
      setState({status: "error", error: new Error("This room is not valid.")})

      return
    }

    // If status is error or loading do nothing.
    // Check if all users have already been loaded, if they have already been loaded do nothing.
    if (
      state.status !== "success" ||
      state.data.admins.length +
        state.data.members.length +
        state.data.moderators.length ===
        activeRoom.getJoinedMemberCount()
    ) {
      return
    }

    setIsLazyLoading(true)

    activeRoom
      .loadMembersIfNeeded()
      .then(async isNeeded => {
        if (!isNeeded || isMountedRef.current !== roomId) {
          return
        }

        try {
          const newMembers = await loadJoinedMembers(client, roomId, false)

          setState(prevState => {
            if (
              prevState.status !== "success" ||
              isMountedRef.current !== roomId
            ) {
              return prevState
            }

            const {data} = prevState

            return {
              status: "success",
              data: {
                admins: data.admins.concat(newMembers.admins),
                moderators: data.moderators.concat(newMembers.moderators),
                members: data.members.concat(newMembers.members),
              },
            }
          })
        } catch (error) {
          if (isMountedRef.current === roomId && error instanceof Error) {
            setState({status: "error", error})
          }
        } finally {
          if (isMountedRef.current === roomId) {
            setIsLazyLoading(false)
          }
        }
      })
      .catch((error: Error) => {
        if (isMountedRef.current === roomId) {
          setState({status: "error", error})
          setIsLazyLoading(false)
        }
      })
  }, [client, roomId, setState, state])

  return {
    onLazyReload,
    membersState: state,
    isLazyLoading,
    onReloadMembers: () => {
      if (client === null || roomId === null) {
        throw new Error("Client not be initialized")
      }

      loadMembers(client, roomId)
    },
  }
}

export default useRoomMembers
