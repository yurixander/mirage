import {type MatrixClient, type Room} from "matrix-js-sdk"
import {getDirectRoomsIds} from "./rooms"
import {RoomType} from "@/components/Room"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {emojiRandom} from "./util"

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
        emoji: emojiRandom(),
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
