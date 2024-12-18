import {
  RoomDetailOwner,
  RoomDetailPreview,
  RoomInvitedError,
} from "@/containers/RoomContainer/RoomInvitedSplash"
import useValueState, {ValueState} from "../util/useValueState"
import useMatrixClient from "./useMatrixClient"
import {useCallback, useEffect} from "react"
import {getImageUrl, getRoomTopic} from "@/utils/matrix"
import {
  getOwnersIdWithPowerLevels,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {isDirectRoom} from "@/utils/rooms"
import {strCapitalize} from "@/utils/util"
import {Room, JoinRule} from "matrix-js-sdk"
import {IHierarchyRoom} from "matrix-js-sdk/lib/@types/spaces"
import useActiveSpaceIdStore from "./useActiveSpaceIdStore"
import {DASHBOARD_SPACE_ID} from "@/containers/NavigationSection/SpacesNavigation"
import {LangKey} from "@/lang/allKeys"
import {t} from "@/utils/lang"

type UseInvitedRoomReturnType = {
  roomInvitedDetail: ValueState<RoomDetailPreview>
  onJoinRoom: () => Promise<void>
}

const useInvitedRoom = (
  activeRoomId: string | null,
  isRecommendedRoom: boolean = false
): UseInvitedRoomReturnType => {
  const client = useMatrixClient()
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
    if (client === null || activeRoomId === null || isRecommendedRoom) {
      return
    }

    const room = client.getRoom(activeRoomId)

    setRoomInvitedDetailScope(async () => {
      if (room === null) {
        throw new RoomInvitedError(t(LangKey.RoomInvitedAccessError))
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
  }, [activeRoomId, client, isRecommendedRoom, setRoomInvitedDetailScope])

  useEffect(() => {
    if (
      client === null ||
      !isRecommendedRoom ||
      activeSpaceId === DASHBOARD_SPACE_ID ||
      activeRoomId === null
    ) {
      return
    }

    const space = client.getRoom(activeSpaceId)

    setRoomInvitedDetailScope(async () => {
      if (space === null) {
        throw new RoomInvitedError(t(LangKey.RoomInvitedRecommendedRoomError))
      }

      const hierarchy = await client.getRoomHierarchy(activeSpaceId)

      const foundedRoom = hierarchy.rooms.find(
        room => room.room_id === activeRoomId
      )

      if (foundedRoom === undefined || foundedRoom.room_type === "m.space") {
        throw new RoomInvitedError(t(LangKey.RoomInvitedNoAccessOrNotFound))
      }

      validateHierarchyRoom(foundedRoom)

      const chips = await getChipsFromHierarchyRoom(foundedRoom)

      return {
        name: foundedRoom.name ?? foundedRoom.room_id,
        topic: foundedRoom.topic,
        avatarUrl: getImageUrl(foundedRoom.avatar_url, client),
        detailChips: chips,
      }
    })
  }, [
    activeRoomId,
    activeSpaceId,
    client,
    isRecommendedRoom,
    setRoomInvitedDetailScope,
  ])

  return {
    roomInvitedDetail,
    onJoinRoom,
  }
}

async function getChipsFromHierarchyRoom(
  room: IHierarchyRoom
): Promise<string[]> {
  const chips: string[] = [t(LangKey.Recommended)]

  if (room.join_rule === JoinRule.Public) {
    chips.push(t(LangKey.Public))
  }

  if (room.num_joined_members > 0) {
    chips.push(t(LangKey.JoinedMembers, room.num_joined_members.toString()))
  }

  return chips
}

function isDirectOrAvailableForDirect(room: Room): boolean {
  try {
    const guessDMUserName = room.getJoinedMembers()[0].name

    return (
      room.getJoinedMemberCount() === 1 &&
      (guessDMUserName === room.name || guessDMUserName === room.normalizedName)
    )
  } catch (error) {
    console.error(error)

    return false
  }
}

async function getChipsFromRoom(room: Room): Promise<string[]> {
  const chips: string[] = []

  const isDirect =
    isDirectRoom(room.client, room.roomId) || isDirectOrAvailableForDirect(room)
  const isSpace = room.isSpaceRoom()
  const membersCount = room.getJoinedMemberCount()

  if (isDirect && !isSpace) {
    chips.push(t(LangKey.Direct))
  }

  if (membersCount > 0 && !isDirect) {
    chips.push(t(LangKey.JoinedMembers, membersCount.toString()))
  }

  if (isSpace) {
    chips.push(t(LangKey.Space))
  } else if (!isSpace && !isDirect) {
    chips.push(t(LangKey.Room))
  }

  if (isSpace) {
    try {
      const {rooms} = await room.client.getRoomHierarchy(room.roomId)

      chips.push(t(LangKey.RoomHierarchyCount, rooms.length.toString()))
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
  } catch {
    for (const {powerLevel, name, getMxcAvatarUrl} of room.getJoinedMembers()) {
      if (processPowerLevelByNumber(powerLevel) === UserPowerLevel.Member) {
        continue
      }

      owners.push({
        displayName: name,
        avatarUrl: getImageUrl(getMxcAvatarUrl(), room.client),
      })
    }
  }

  return owners.length === 0 ? null : owners
}

function validateHierarchyRoom(foundedRoom: IHierarchyRoom): void {
  if (foundedRoom.room_type === "m.space") {
    throw new RoomInvitedError(t(LangKey.RoomInvitedParentSpaceError))
  }

  if (
    foundedRoom.join_rule !== JoinRule.Public &&
    !foundedRoom.guest_can_join
  ) {
    throw new RoomInvitedError(t(LangKey.RoomInvitedJoinError))
  }
}

export default useInvitedRoom
