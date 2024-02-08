import {useMemo, type FC} from "react"
import Label from "../components/Label"
import useRooms from "@/hooks/matrix/useRooms"
import Room, {RoomType} from "@/components/Room"
import {NotificationCountType} from "matrix-js-sdk"

const RoomsList: FC = () => {
  const {rooms} = useRooms()

  // TODO: Continue implementation.

  // const rooms = useSyncedMap<string, Room>(
  //   ClientEvent.Room,
  //   ClientEvent.DeleteRoom,
  //   handleAddRoom,
  //   handleRemoveRoom
  // )

  const spaceElements = useMemo(
    () =>
      rooms
        ?.filter(room => room.isSpaceRoom())
        .map((room, index) => (
          <Room
            key={index}
            name={room.name}
            type={RoomType.Space}
            isActive={false}
            containsUnreadMessages={
              room.getUnreadNotificationCount(NotificationCountType.Total) > 0
            }
            mentionCount={room.getUnreadNotificationCount(
              NotificationCountType.Highlight
            )}
            onClick={() => {}}
          />
        )),
    [rooms]
  )

  const roomElements = useMemo(
    () =>
      rooms
        ?.filter(room => !room.isSpaceRoom())
        .map((room, index) => (
          <Room
            key={index}
            name={room.name}
            type={RoomType.Text}
            isActive={false}
            containsUnreadMessages={
              room.getUnreadNotificationCount(NotificationCountType.Total) > 0
            }
            mentionCount={room.getUnreadNotificationCount(
              NotificationCountType.Highlight
            )}
            onClick={() => {}}
          />
        )),
    [rooms]
  )

  return (
    <section className="flex h-full flex-col gap-8 p-1 scrollbar-hide">
      <nav className="flex flex-col gap-4">
        <Label text="Spaces" />

        {spaceElements}
      </nav>

      <nav className="flex flex-col gap-4">
        <Label text="Rooms" />
        {roomElements}
      </nav>
    </section>
  )
}

export default RoomsList
