import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {useEffect, useState} from "react"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {type MatrixClient, RoomMemberEvent} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"

export enum RoomState {
  Idle,
  Invited,
  Joined,
  NotFound,
}

type UseActiveRoomReturnType = {
  client: MatrixClient | null
  roomState: RoomState
  activeRoomId: string | null
  clearActiveRoomId: () => void
}

const useActiveRoom = (): UseActiveRoomReturnType => {
  const client = useMatrixClient()
  const [roomState, setRoomState] = useState(RoomState.Idle)
  const {activeRoomId, clearActiveRoomId} = useActiveRoomIdStore()

  useEffect(() => {
    setRoomState(RoomState.Idle)
  }, [activeRoomId])

  // useEffect(() => {
  //   if (client === null || activeRoomId === null) {
  //     return
  //   }

  //   const room = client.getRoom(activeRoomId)

  //   // if (activeSpaceId !== DASHBOARD_SPACE_ID && room === null) {
  //   //   const space = client.getRoom(activeSpaceId)

  //   //   setRoomInvitedDetailScope(async () => {
  //   //     if (space === null) {
  //   //       throw new RoomInvitedError("You not have access to this space.")
  //   //     }

  //   //     const hierarchy = await client.getRoomHierarchy(space.roomId)

  //   //     const foundedRoom = hierarchy.rooms.find(
  //   //       hierarchyRoom => hierarchyRoom.room_id === activeRoomId
  //   //     )

  //   //     if (foundedRoom === undefined) {
  //   //       throw new RoomInvitedError(
  //   //         "You do not have access to the room or it does not exist."
  //   //       )
  //   //     }

  //   //     validateHierarchyRoom(foundedRoom)

  //   //     return {
  //   //       name: foundedRoom.name ?? foundedRoom.room_id,
  //   //       topic: foundedRoom.topic,
  //   //       avatarUrl: getImageUrl(foundedRoom.avatar_url, client),
  //   //       detailChips: [],
  //   //     }
  //   //   })

  //   //   return
  //   // }
  // }, [activeRoomId, client])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      setRoomState(RoomState.NotFound)

      return
    }

    const membership = room.getMyMembership()

    setRoomState(() => {
      if (
        membership !== KnownMembership.Join &&
        membership !== KnownMembership.Invite
      ) {
        return RoomState.NotFound
      }

      return membership === KnownMembership.Join
        ? RoomState.Joined
        : RoomState.Invited
    })
  }, [activeRoomId, client])

  useEventListener(RoomMemberEvent.Membership, (_, member) => {
    if (
      client === null ||
      member.userId !== client.getUserId() ||
      activeRoomId !== member.roomId
    ) {
      return
    }

    // If you are kicked out of the room, update the UI so that you cannot access the room.
    if (
      member.membership !== KnownMembership.Join &&
      member.membership !== KnownMembership.Invite
    ) {
      setRoomState(RoomState.NotFound)
      clearActiveRoomId()

      return
    }

    setRoomState(
      member.membership === KnownMembership.Join
        ? RoomState.Joined
        : RoomState.Invited
    )
  })

  return {
    client,
    roomState,
    activeRoomId,
    clearActiveRoomId,
  }
}

export default useActiveRoom
