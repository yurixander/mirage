import {
  RoomDetailOwner,
  RoomDetailPreview,
  RoomInvitedError,
} from "@/containers/RoomContainer/RoomInvitedSplash"
import useValueState, {ValueState} from "../util/useValueState"
import useMatrixClient from "./useMatrixClient"
import {useCallback, useEffect} from "react"
import {getImageUrl, getRoomTopic} from "@/utils/matrix"
import {getOwnersIdWithPowerLevels} from "@/utils/members"
import {isDirectRoom} from "@/utils/rooms"
import {strCapitalize} from "@/utils/util"
import {Room, JoinRule} from "matrix-js-sdk"
import {IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"

type UseInvitedRoomReturnType = {
  roomInvitedDetail: ValueState<RoomDetailPreview>
  onJoinRoom: () => Promise<void>
}

const useInvitedRoom = (
  activeRoomId: string | null
): UseInvitedRoomReturnType => {
  const client = useMatrixClient()

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
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

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
  }, [activeRoomId, client, setRoomInvitedDetailScope])

  return {
    roomInvitedDetail,
    onJoinRoom,
  }
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

function validateHierarchyRoom(foundedRoom: IHierarchyRoom): void {
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

export default useInvitedRoom
