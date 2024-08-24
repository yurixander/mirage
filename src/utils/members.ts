import {type Room, EventTimeline, EventType} from "matrix-js-sdk"

// #region PowerLevels
export enum UserPowerLevel {
  Admin = 100,
  Moderator = 50,
  Member = 0,
}

export type RoomMemberWithPowerLevel = {
  userId: string
  powerLevel: UserPowerLevel
}

type PowerLevelResponse = Record<string, {powerLevel: unknown}>

function getPowerLevelsFromRoom(room: Room): PowerLevelResponse {
  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)

  if (roomState === undefined) {
    return {}
  }

  return roomState.getStateEvents(EventType.RoomPowerLevels, "")?.getContent()
    .users
}

export function processPowerLevelByNumber(powerLevel: number): UserPowerLevel {
  return powerLevel === UserPowerLevel.Admin
    ? UserPowerLevel.Admin
    : powerLevel >= UserPowerLevel.Moderator &&
        powerLevel < UserPowerLevel.Admin
      ? UserPowerLevel.Moderator
      : UserPowerLevel.Member
}

export function getRoomPowerLevelByUserId(
  room: Room,
  userId: string
): UserPowerLevel {
  const users = getPowerLevelsFromRoom(room)
  const user = users[userId]

  if (user === undefined || typeof user !== "number") {
    return UserPowerLevel.Member
  }

  return processPowerLevelByNumber(user)
}

export function getRoomUsersIdWithPowerLevels(
  room: Room
): RoomMemberWithPowerLevel[] {
  const powerLevels = getPowerLevelsFromRoom(room)
  const usersWithPowerLevels: RoomMemberWithPowerLevel[] = []

  try {
    const users = Object.entries(powerLevels)

    for (const [userId, powerLevel] of users) {
      if (typeof powerLevel !== "number") {
        continue
      }

      const userPowerLevel = processPowerLevelByNumber(powerLevel)

      usersWithPowerLevels.push({
        userId,
        powerLevel: userPowerLevel,
      })
    }
  } catch {}

  return usersWithPowerLevels
}

// #region RoomMembers
export function isCurrentUserAdminOrMod(room: Room): boolean {
  const currentUserPowerLevel = getRoomPowerLevelByUserId(room, room.myUserId)

  return currentUserPowerLevel !== UserPowerLevel.Member
}

export async function getUserLastPresence(
  roomWithLimit: Room,
  limit: number,
  userId: string
): Promise<number | null> {
  const events = roomWithLimit.getLiveTimeline().getEvents()

  let counter = 0

  for (let index = events.length - 1; index >= 0; index--) {
    if (counter > limit) {
      break
    }

    const event = events[index]

    if (event.getSender() === userId) {
      return event.localTimestamp
    }

    counter++
  }

  return null
}
