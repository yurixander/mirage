import {useMemo, type FC} from "react"
import Label from "../components/Label"
import useRooms from "@/hooks/matrix/useRooms"
import Room, {RoomType} from "@/components/Room"

const RoomsList: FC = () => {
  const {rooms} = useRooms()

  const roomElements = useMemo(
    () =>
      rooms
        .filter(room => room.type === RoomType.Group)
        .map((room, index) => <Room key={index} {...room} />),
    [rooms]
  )

  const directRoomElements = useMemo(
    () =>
      rooms
        .filter(room => room.type === RoomType.Direct)
        .map((room, index) => <Room key={index} {...room} />),
    [rooms]
  )

  return (
    <section className="flex h-full flex-col gap-8 p-4 scrollbar-hide">
      <nav className="flex flex-col gap-4">
        <Label text="Direct" />

        {directRoomElements}
      </nav>

      <nav className="flex flex-col gap-4">
        <Label text="Rooms" />

        {roomElements}
      </nav>
    </section>
  )
}

export default RoomsList
