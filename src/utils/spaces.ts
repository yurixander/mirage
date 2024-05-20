import {type PartialRoom} from "@/containers/NavigationSection/SpaceList"
import {RoomType, type Room} from "matrix-js-sdk"

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

export async function getRoomsFromSpace(space: Room): Promise<PartialRoom[]> {
  const roomHierarchy = await space.client.getRoomHierarchy(space.roomId)

  const childRooms: PartialRoom[] = []

  for (const room of roomHierarchy.rooms) {
    if (room.name === undefined || room.room_type === RoomType.Space) {
      continue
    }

    childRooms.push({
      roomId: room.room_id,
      roomName: room.name,
    })
  }

  return childRooms
}
