import {type MatrixClient, type Room} from "matrix-js-sdk"
import {isDirectRoom} from "./rooms"
import {RoomType} from "@/components/Room"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"

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

export async function getRoomsFromSpace(
  spaceId: string,
  client: MatrixClient
): Promise<PartialRoom[]> {
  const roomsHierarchy: PartialRoom[] = []

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

      if (room.isSpaceRoom()) {
        continue
      }

      roomsHierarchy.push({
        roomId: room.roomId,
        roomName: room.name,
        type: isDirectRoom(room) ? RoomType.Direct : RoomType.Group,
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
