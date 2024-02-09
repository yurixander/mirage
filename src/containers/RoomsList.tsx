import {useEffect, type FC} from "react"
import Label from "../components/Label"
import useRooms from "@/hooks/matrix/useRooms"
import Room, {RoomType} from "@/components/Room"
import {NotificationCountType} from "matrix-js-sdk"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"

const RoomsList: FC = () => {
  const {rooms} = useRooms()
  const {connect} = useConnection()
  const {credentials} = useCachedCredentials()

  // Connect on startup.
  useEffect(() => {
    if (credentials === null) {
      return
    }

    void connect(credentials)
  }, [connect, credentials])

  const spaceElements = useMemo(
    () =>
      rooms
        ?.filter(room => room.isSpaceRoom())
        .map((room, index) => (
          <Room
            key={index}
            name={room.name}
            type={RoomType.Space}
            isActive={selectedRoom === room}
            containsUnreadMessages={
              room.getUnreadNotificationCount(NotificationCountType.Total) > 0
            }
            mentionCount={room.getUnreadNotificationCount(
              NotificationCountType.Highlight
            )}
            onClick={() => {
              selectRoom(room)
            }}
          />
        )),
    [rooms, selectRoom, selectedRoom]
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
            isActive={selectedRoom === room}
            containsUnreadMessages={
              room.getUnreadNotificationCount(NotificationCountType.Total) > 0
            }
            mentionCount={room.getUnreadNotificationCount(
              NotificationCountType.Highlight
            )}
            onClick={() => {
              selectRoom(room)
            }}
          />
        )),
    [rooms, selectRoom, selectedRoom]
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
