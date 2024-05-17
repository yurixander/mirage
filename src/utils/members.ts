import {UserPowerLevel} from "@/containers/Roster/RosterUser"
import {
  type Room,
  type MatrixClient,
  EventTimeline,
  EventType,
} from "matrix-js-sdk"

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

export function getRoomAdminsAndModerators(room: Room): PartialRoomMember[] {
  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)

  if (roomState === undefined) {
    return []
  }

  const userPowerLevels: string[] =
    roomState.getStateEvents("m.room.power_levels", "")?.getContent().users ??
    []

  const users = Object.entries(userPowerLevels)
  const partialAdminOrModerator: PartialRoomMember[] = []

  for (const [adminId, powerLevel] of users) {
    if (
      typeof powerLevel !== "number" ||
      powerLevel < UserPowerLevel.Moderator
    ) {
      continue
    }

    partialAdminOrModerator.push({
      userId: adminId,
      powerLevel:
        powerLevel === UserPowerLevel.Admin
          ? UserPowerLevel.Admin
          : UserPowerLevel.Moderator,
    })
  }

  return partialAdminOrModerator
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
