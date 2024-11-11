import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {useCallback, useEffect, useState} from "react"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {JoinRule, type MatrixClient, Room, RoomMemberEvent} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useValueState, {ValueState} from "@/hooks/util/useValueState"
import {
  RoomDetailOwner,
  RoomDetailPreview,
  RoomInvitedError,
} from "../RoomInvitedSplash"
import {getImageUrl, getRoomTopic} from "@/utils/matrix"
import {isDirectRoom} from "@/utils/rooms"
import {getOwnersIdWithPowerLevels} from "@/utils/members"
import {strCapitalize} from "@/utils/util"
import useActiveSpaceIdStore from "@/hooks/matrix/useActiveSpaceIdStore"
import {DASHBOARD_SPACE_ID} from "@/containers/NavigationSection/SpacesNavigation"
import {IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"

export enum RoomState {
  Idle,
  Invited,
  Joined,
  NotFound,
}

type UseActiveRoomReturnType = {
  client: MatrixClient | null
  roomState: RoomState
  roomInvitedDetail: ValueState<RoomDetailPreview>
  activeRoomId: string | null
  clearActiveRoomId: () => void
  onJoinRoom: () => Promise<void>
}

async function getChipsFromRoom(room: Room): Promise<string[]> {
  const chips: string[] = []

  const isDirect = isDirectRoom(room.client, room.roomId)
  const isSpace = room.isSpaceRoom()
  const membersCount = room.getJoinedMemberCount()

  if (isDirect && !isSpace) {
    chips.push("Direct")
  }

  if (membersCount > 0 && !isDirect) {
    chips.push(`+${membersCount} Members`)
  }

  if (isSpace) {
    chips.push("Space")
  } else {
    chips.push("Room")
  }

  if (isSpace) {
    try {
      const hierarchy = await room.client.getRoomHierarchy(room.roomId)

      chips.push(`+${hierarchy.rooms.length} Rooms`)
    } catch {
      console.error(`Could not load the space hierarchy ${room.name}`)
    }
  }

  chips.push(strCapitalize(room.getJoinRule()))

  return chips
}

async function getRoomOwners(room: Room): Promise<RoomDetailOwner[] | null> {
  const owners: RoomDetailOwner[] = []
  try {
    const ownersId = getOwnersIdWithPowerLevels(room)

    const roomMembers = await room.client.getJoinedRoomMembers(room.roomId)

    for (const {userId} of ownersId) {
      const ownerMember = roomMembers.joined[userId]

      if (ownerMember === undefined) {
        continue
      }

      owners.push({
        displayName: ownerMember.display_name,
        avatarUrl: getImageUrl(ownerMember.avatar_url, room.client),
      })
    }
  } catch (error) {
    console.error(error)

    return null
  }

  return owners.length === 0 ? null : owners
}

export function validateHierarchyRoom(foundedRoom: IHierarchyRoom): void {
  if (foundedRoom.room_type === "m.space") {
    throw new RoomInvitedError("You cannot access the same parent space.")
  }

  if (
    foundedRoom.join_rule !== JoinRule.Public &&
    !foundedRoom.guest_can_join
  ) {
    throw new RoomInvitedError("This room does not allow anyone to join.")
  }
}

const useActiveRoom = (): UseActiveRoomReturnType => {
  const client = useMatrixClient()
  const [roomState, setRoomState] = useState(RoomState.Idle)
  const {activeRoomId, clearActiveRoomId} = useActiveRoomIdStore()
  const {activeSpaceId} = useActiveSpaceIdStore()

  const [roomInvitedDetail, setRoomInvitedDetail] =
    useValueState<RoomDetailPreview>()

  const setRoomInvitedDetailScope = useCallback(
    (execute: () => Promise<RoomDetailPreview>) => {
      execute()
        .then(value => {
          setRoomInvitedDetail({status: "success", data: value})
        })
        .catch((error: Error) => {
          setRoomInvitedDetail({status: "error", error})
        })
    },
    [setRoomInvitedDetail]
  )

  const onJoinRoom = useCallback(async () => {
    if (client === null || activeRoomId === null) {
      return
    }

    await client.joinRoom(activeRoomId)
  }, [activeRoomId, client])

  useEffect(() => {
    setRoomState(RoomState.Idle)
  }, [activeRoomId])

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (activeSpaceId !== DASHBOARD_SPACE_ID && room === null) {
      const space = client.getRoom(activeSpaceId)

      setRoomInvitedDetailScope(async () => {
        if (space === null) {
          throw new RoomInvitedError("You not have access to this space.")
        }

        const hierarchy = await client.getRoomHierarchy(space.roomId)

        const foundedRoom = hierarchy.rooms.find(
          hierarchyRoom => hierarchyRoom.room_id === activeRoomId
        )

        if (foundedRoom === undefined) {
          throw new RoomInvitedError(
            "You do not have access to the room or it does not exist."
          )
        }

        validateHierarchyRoom(foundedRoom)

        return {
          name: foundedRoom.name ?? foundedRoom.room_id,
          topic: foundedRoom.topic,
          avatarUrl: getImageUrl(foundedRoom.avatar_url, client),
          detailChips: [],
        }
      })

      return
    }

    setRoomInvitedDetailScope(async () => {
      if (room === null) {
        throw new RoomInvitedError("You not have access to this room.")
      }

      const chips = await getChipsFromRoom(room)
      const owners = await getRoomOwners(room)

      return {
        name: room.name,
        topic: getRoomTopic(room) ?? undefined,
        avatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
        detailChips: chips,
        owners: owners ?? undefined,
      }
    })
  }, [activeRoomId, activeSpaceId, client, setRoomInvitedDetailScope])

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
    roomInvitedDetail,
    activeRoomId,
    clearActiveRoomId,
    onJoinRoom,
  }
}

export default useActiveRoom
