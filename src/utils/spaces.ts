import {RoomEvent, type MatrixClient, type Room} from "matrix-js-sdk"
import {getDirectRoomsIds} from "./rooms"
import {RoomType} from "@/components/Room"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {stringToEmoji} from "./util"

export const addRoomToSpace = async (
  spaceId: Room,
  roomId: string
): Promise<boolean> => {
  try {
    await spaceId.client.sendStateEvent(
      spaceId.roomId,
      "m.space.child",
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

export async function getJoinedSpaces(client: MatrixClient): Promise<Room[]> {
  const joinedRooms = await client.getJoinedRooms()

  return joinedRooms.joined_rooms
    .map(roomId => client.getRoom(roomId))
    .filter(room => room !== null)
    .filter(room => room.isSpaceRoom())
}

export async function getRoomsFromSpace(
  spaceId: string,
  client: MatrixClient
): Promise<PartialRoom[]> {
  const roomsHierarchy: PartialRoom[] = []
  const directRoomIds = getDirectRoomsIds(client)

  try {
    const childRooms = await client.getRoomHierarchy(spaceId)

    for (const childRoom of childRooms.rooms) {
      if (childRoom.room_type === "m.space") {
        continue
      }

      const room = client.getRoom(childRoom.room_id)

      if (room === null) {
        if (childRoom.guest_can_join) {
          // TODO: Handle if the user does not have the room but you can join.
        }

        continue
      }

      roomsHierarchy.push({
        roomId: room.roomId,
        roomName: room.name,
        emoji: stringToEmoji(childRoom.room_id),
        type: directRoomIds.includes(room.roomId)
          ? RoomType.Direct
          : RoomType.Group,
      })
    }
  } catch (error) {
    console.error(
      "An error occurred while retrieving rooms from the space:",
      error
    )
  }

  return roomsHierarchy
}
