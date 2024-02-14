import {useMemo, type FC} from "react"
import Label from "../components/Label"
import useRooms from "@/hooks/matrix/useRooms"
import Room, {RoomType} from "@/components/Room"
import {NotificationCountType} from "matrix-js-sdk"
import useSpaceRooms from "@/hooks/matrix/useSpaceRooms"

const RoomsList: FC = () => {
  const {rooms, activeRoomId, setActiveRoomId} = useRooms()
  const {childRooms, activeSpaceId} = useSpaceRooms()

  const roomElements = useMemo(
    () =>
      (activeSpaceId === null ? rooms : childRooms)
        ?.filter(room => !room.isSpaceRoom())
        .map((room, index) => (
          <Room
            key={index}
            name={room.name}
            type={RoomType.Text}
            isActive={activeRoomId === room.roomId}
            containsUnreadMessages={
              room.getUnreadNotificationCount(NotificationCountType.Total) > 0
            }
            mentionCount={room.getUnreadNotificationCount(
              NotificationCountType.Highlight
            )}
            onClick={() => {
              setActiveRoomId(room.roomId)
            }}
          />
        )),
    [childRooms, rooms, activeRoomId, setActiveRoomId, activeSpaceId]
  )

  return (
    <section className="flex h-full flex-col gap-8 p-4 scrollbar-hide">
      {/* <nav className="flex flex-col gap-4"><Label text="Spaces" /></nav> */}

      <nav className="flex flex-col gap-4">
        <Label text="Rooms" />

        {roomElements}
      </nav>
    </section>
  )
}

export default RoomsList
