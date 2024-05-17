import {
  type RosterUserProps,
  UserPowerLevel,
} from "@/containers/Roster/RosterUser"
import {
  type Room,
  type MatrixClient,
  EventTimeline,
  EventType,
} from "matrix-js-sdk"
import {getImageUrl, normalizeName} from "./util"
import {ImageSizes} from "./rooms"

// TODO: Check why existing two const for admin power level.
const MIN_ADMIN_POWER_LEVEL = 50

export function isUserRoomAdmin(room: Room, client: MatrixClient): boolean {
  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)
  const userId = client.getUserId()

  if (roomState === undefined || userId === null) {
    return false
  }

  const powerLevels: string[] = roomState
    .getStateEvents("m.room.power_levels", "")
    ?.getContent().users

  const users = Object.entries(powerLevels)

  for (const [adminId, powerLevel] of users) {
    if (typeof powerLevel !== "number" || powerLevel < MIN_ADMIN_POWER_LEVEL) {
      continue
    }

    if (adminId === userId) {
      return true
    }
  }

  return false
}

export type PartialRoomMember = {
  userId: string
  powerLevel: UserPowerLevel
}

export async function getRoomAdminsAndModerators(
  room: Room
): Promise<RosterUserProps[]> {
  const allMembers = await room.client.getJoinedRoomMembers(room.roomId)
  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)

  if (roomState === undefined) {
    return []
  }

  const userPowerLevels: string[] =
    roomState.getStateEvents("m.room.power_levels", "")?.getContent().users ??
    []

  const users = Object.entries(userPowerLevels)
  const adminsOrModerators: RosterUserProps[] = []

  for (const [adminId, powerLevel] of users) {
    if (
      typeof powerLevel !== "number" ||
      powerLevel < UserPowerLevel.Moderator
    ) {
      continue
    }

    const member = allMembers.joined[adminId]

    if (member === undefined) {
      continue
    }

    const displayName = normalizeName(member.display_name ?? adminId)

    const lastPresenceAge = await getUserLastPresence(room, adminId)

    adminsOrModerators.push({
      displayName,
      lastPresenceAge: lastPresenceAge ?? undefined,
      avatarUrl: getImageUrl(
        member.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
      // TODO: Use actual props instead of dummy data.
      powerLevel:
        powerLevel === UserPowerLevel.Admin
          ? UserPowerLevel.Admin
          : UserPowerLevel.Member,
      onClick: () => {},
      userId: adminId,
    })
  }

  return adminsOrModerators
}

export async function getUserLastPresence(
  room: Room,
  userId: string
): Promise<number | null> {
  const roomHistory = await room.client.scrollback(room, 30)
  const events = roomHistory.getLiveTimeline().getEvents()

  for (const event of events) {
    if (event.getType() !== EventType.RoomMessage) {
      continue
    }

    if (event.getSender() === userId) {
      return event.localTimestamp
    }
  }

  return null
}
