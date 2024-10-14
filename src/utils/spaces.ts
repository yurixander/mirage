import {EventType, JoinRule, type MatrixClient, type Room} from "matrix-js-sdk"
import {getDirectRoomsIds} from "./rooms"
import {RoomType} from "@/components/Room"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {stringToEmoji} from "./util"
import {type RoomSections} from "@/containers/NavigationSection/RoomNavigator"

export const addRoomToSpace = async (
  spaceId: Room,
  roomId: string
): Promise<boolean> => {
  try {
    await spaceId.client.sendStateEvent(
      spaceId.roomId,
      EventType.SpaceChild,
      {
        via: ["matrix.org"],
      },
      roomId
    )

    return true
  } catch (error) {
    console.error("Error adding room:", error)

    return false
  }
}

export async function getSpaceRoomSections(
  spaceId: string,
  client: MatrixClient
): Promise<RoomSections | null> {
  const space = client.getRoom(spaceId)
  const directRoomIds = getDirectRoomsIds(client)

  const recommended: PartialRoom[] = []
  const directs: PartialRoom[] = []
  const groups: PartialRoom[] = []

  if (space === null) {
    return null
  }

  const childRooms = await client.getRoomHierarchy(spaceId)

  for (const childRoom of childRooms.rooms) {
    if (childRoom.room_type === "m.space") {
      continue
    }

    const room = client.getRoom(childRoom.room_id)

    if (room === null) {
      if (childRoom.join_rule === JoinRule.Public) {
        recommended.push({
          roomId: childRoom.room_id,
          roomName: childRoom.name ?? childRoom.room_id,
          emoji: stringToEmoji(childRoom.room_id),
          type: RoomType.Group,
        })
      }

      continue
    }

    if (directRoomIds.includes(room.roomId)) {
      directs.push({
        roomId: room.roomId,
        roomName: room.name ?? room.roomId,
        emoji: stringToEmoji(childRoom.room_id),
        type: RoomType.Direct,
      })

      continue
    }

    groups.push({
      roomId: room.roomId,
      roomName: room.name ?? room.roomId,
      emoji: stringToEmoji(childRoom.room_id),
      type: RoomType.Group,
    })
  }

  return {
    recommended,
    directs,
    groups,
  }
}

export async function getJoinedSpaces(client: MatrixClient): Promise<Room[]> {
  const joinedRooms = await client.getJoinedRooms()

  return joinedRooms.joined_rooms
    .map(roomId => client.getRoom(roomId))
    .filter(room => room !== null)
    .filter(room => room.isSpaceRoom())
}
