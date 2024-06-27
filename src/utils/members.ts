import {type RosterUserProps} from "@/containers/Roster/RosterUser"
import {type Room, EventTimeline} from "matrix-js-sdk"
import {getImageUrl, normalizeName} from "./util"
import {ImageSizes} from "./rooms"

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

  return roomState.getStateEvents("m.room.power_levels", "")?.getContent().users
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
  userId: string | null
): UserPowerLevel | null {
  const users = getPowerLevelsFromRoom(room)

  if (userId === null) {
    return null
  }

  const userPowerLevel = users[userId].powerLevel

  if (typeof userPowerLevel !== "number") {
    return null
  }

  return processPowerLevelByNumber(userPowerLevel)
}

export function getRoomUsersIdWithPowerLevels(
  room: Room
): RoomMemberWithPowerLevel[] {
  const powerLevels = getPowerLevelsFromRoom(room)
  const usersWithPowerLevels: RoomMemberWithPowerLevel[] = []
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

  return usersWithPowerLevels
}

export function isUserRoomAdminOrMod(room: Room): boolean {
  const currentUserId = room.client.getUserId()

  if (currentUserId === null) {
    return false
  }

  const currentUserPowerLevel = getRoomPowerLevelByUserId(room, currentUserId)

  return (
    currentUserPowerLevel !== null &&
    currentUserPowerLevel !== UserPowerLevel.Member
  )
}

export async function getRoomAdminsAndModerators(
  room: Room
): Promise<RosterUserProps[]> {
  const allMembers = await room.client.getJoinedRoomMembers(room.roomId)
  const userPowerLevels = getRoomUsersIdWithPowerLevels(room)
  const adminsOrModerators: RosterUserProps[] = []

  for (const user of userPowerLevels) {
    if (user.powerLevel === UserPowerLevel.Member) {
      continue
    }

    const member = allMembers.joined[user.userId]

    if (member === undefined) {
      continue
    }

    const displayName = normalizeName(member.display_name ?? user.userId)
    const lastPresenceAge = await getUserLastPresence(room, user.userId)

    adminsOrModerators.push({
      displayName,
      lastPresenceAge: lastPresenceAge ?? undefined,
      powerLevel: user.powerLevel,
      userId: user.userId,
      onClick: () => {
        throw new Error("Roster user click not handled.")
      },
      avatarUrl: getImageUrl(
        member.avatar_url,
        room.client,
        ImageSizes.MessageAndProfile
      ),
    })
  }

  return adminsOrModerators
}

// #region Current User
export async function getUserLastPresence(
  room: Room,
  userId: string
): Promise<number | null> {
  const roomHistory = await room.client.scrollback(room, 30)
  const events = roomHistory.getLiveTimeline().getEvents()

  for (let index = events.length - 1; index >= 0; index--) {
    const event = events[index]

    if (event.getSender() === userId) {
      return event.localTimestamp
    }
  }

  return null
}
