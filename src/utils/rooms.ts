import {
  EventTimeline,
  type Room,
  type MatrixClient,
  Direction,
  EventType,
} from "matrix-js-sdk"
import {
  assert,
  CommonAssertion,
  getImageUrl,
  ImageSizes,
  normalizeName,
  stringToColor,
} from "./util"
import {type RosterUserProps, UserPowerLevel} from "@/components/RosterUser"
import {UserStatus} from "@/components/UserProfile"
import {getRoomAdminsAndModerators} from "./members"

export function getDirectRoomsIds(client: MatrixClient): string[] {
  const directRooms = client.getAccountData("m.direct")
  const content = directRooms?.event.content

  if (content === undefined) {
    return []
  }

  return Object.values(content).flat()
}

export function getRoomsFromSpace(
  spaceId: string,
  client: MatrixClient
): Room[] {
  const space = client.getRoom(spaceId)

  if (space === null || !space.isSpaceRoom()) {
    throw new Error("The space is not valid.")
  }

  const childEvents = space
    .getLiveTimeline()
    .getState(EventTimeline.FORWARDS)
    ?.getStateEvents("m.space.child")

  // Fetch space child events to identify associated rooms.
  // OPTIMIZE: Consider more efficient filtering to avoid iterating over all rooms.
  const storeRooms = client.getRooms().filter(room =>
    room
      .getLiveTimeline()
      .getState(EventTimeline.FORWARDS)
      ?.getStateEvents("m.space.parent")
      .some(
        event =>
          // Check if room's parent spaceId matches the selected space.
          event.getStateKey() === spaceId &&
          // When there is content it means that the room is related to a space.
          Object.keys(event.getContent()).length > 0
      )
  )

  if (childEvents === undefined) {
    throw new Error("The selected space does not have associated child rooms.")
  }

  for (const event of childEvents) {
    // Skip event if it has no content, indicating no association with the parent space.
    if (Object.keys(event.getContent()).length === 0) {
      continue
    }

    const room = client.getRoom(event.getStateKey())

    // Ignore if room is null, meaning it's not available in the client.
    // Avoid adding the room if already in storeRooms to prevent duplicates.
    if (room !== null && !storeRooms.includes(room)) {
      storeRooms.push(room)
    }
  }

  return storeRooms
}

export function isDirectRoom(client: MatrixClient | null, room: Room): boolean {
  if (client === null) {
    return false
  }

  const myUserId = client.getUserId()

  assert(myUserId !== null, CommonAssertion.UserIdNotFound)

  return (
    room
      .getLiveTimeline()
      .getState(Direction.Forward)
      ?.events.get(EventType.RoomMember)
      // Find event by userId.
      // If the client user is not in the room event then this room is not a direct chat for the user.
      ?.get(myUserId)?.event.content?.is_direct ?? false
  )
}

export async function getRoomMembers(
  client: MatrixClient,
  room: Room
): Promise<RosterUserProps[]> {
  const membersProperty: RosterUserProps[] = []
  const members = await client.getJoinedRoomMembers(room.roomId)
  const partialAdminsOrModerators = getRoomAdminsAndModerators(room)
  const joinedMembers = members.joined

  for (const adminOrModerator of partialAdminsOrModerators) {
    const member = joinedMembers[adminOrModerator.userId]

    if (member === undefined) {
      continue
    }

    const displayName = normalizeName(
      member.display_name ?? adminOrModerator.userId
    )

    membersProperty.push({
      // TODO: Use actual props instead of dummy data.
      userProfileProps: {
        avatarUrl: getImageUrl(
          member.avatar_url,
          client,
          ImageSizes.MessageAndProfile
        ),
        text: "Online",
        displayName,
        displayNameColor: stringToColor(displayName),
        status: UserStatus.Online,
      },
      powerLevel: adminOrModerator.powerLevel,
      onClick: () => {},
      userId: adminOrModerator.userId,
    })
  }

  let memberCount = 0

  for (const userId in joinedMembers) {
    if (memberCount >= 30) {
      break
    }

    const member = joinedMembers[userId]

    const isAdminOrModerator = partialAdminsOrModerators.some(
      adminOrModerator => adminOrModerator.userId === userId
    )

    if (member === undefined || isAdminOrModerator) {
      continue
    }

    const displayName = normalizeName(member.display_name ?? userId)

    membersProperty.push({
      // TODO: Use actual props instead of dummy data.
      userProfileProps: {
        avatarUrl: getImageUrl(
          member.avatar_url,
          client,
          ImageSizes.MessageAndProfile
        ),
        text: "Online",
        displayName,
        displayNameColor: stringToColor(displayName),
        status: UserStatus.Online,
      },
      powerLevel: UserPowerLevel.Member,
      onClick: () => {},
      userId,
    })

    memberCount += 1
  }

  return membersProperty
}
