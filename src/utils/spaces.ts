import {EventTimeline, type MatrixClient, type Room} from "matrix-js-sdk"

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
