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

export function getOwnersWithLevelsMap(
  room: Room
): Map<string, UserPowerLevel> {
  const powerLevels = getPowerLevelsFromRoom(room)
  const ownersWithLevelsMap = new Map<string, UserPowerLevel>()
  const users = Object.entries(powerLevels)

  for (const [userId, powerLevel] of users) {
    if (typeof powerLevel !== "number") {
      continue
    }

    const userPowerLevel = processPowerLevelByNumber(powerLevel)

    if (userPowerLevel === UserPowerLevel.Member) {
      continue
    }

    ownersWithLevelsMap.set(userId, powerLevel)
  }

  return ownersWithLevelsMap
}

export function getOwnersIdWithPowerLevels(
  room: Room
): RoomMemberWithPowerLevel[] {
  const powerLevels = getPowerLevelsFromRoom(room)
  const ownersWithPowerLevel: RoomMemberWithPowerLevel[] = []

  const users = Object.entries(powerLevels)

  for (const [userId, powerLevel] of users) {
    if (typeof powerLevel !== "number") {
      continue
    }

    const userPowerLevel = processPowerLevelByNumber(powerLevel)

    if (userPowerLevel === UserPowerLevel.Member) {
      continue
    }

    ownersWithPowerLevel.push({
      userId,
      powerLevel: userPowerLevel,
    })
  }

  return ownersWithPowerLevel
}

type OwnersWithLevelsMap = Map<string, UserPowerLevel>

export function ownersWithPowerLevelMapper(
  members: RoomMemberWithPowerLevel[]
): OwnersWithLevelsMap {
  const membersMapped = new Map<string, UserPowerLevel>()

  for (const roomMember of members) {
    membersMapped.set(roomMember.userId, roomMember.powerLevel)
  }

  return membersMapped
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
