import {useMemo, type FC} from "react"
import Label from "../components/Label"
import useRooms from "@/hooks/matrix/useRooms"
import Room, {RoomType} from "@/components/Room"

const RoomsList: FC = () => {
  const {rooms} = useRooms()

  // TODO: Continue implementation.

  // const handleAddRoom: MatrixEventCallback<string | Room> = () => {
  //   return fetchRooms
  // }

  // const handleRemoveRoom = () => {}

  // const rooms = useSyncedMap<string, Room>(
  //   ClientEvent.Room,
  //   ClientEvent.DeleteRoom,
  //   handleAddRoom,
  //   handleRemoveRoom
  // )

  // const textChannels = useMemo(
  //   () => rooms.filter(room => room.getType === RoomType.Text),
  //   [rooms]
  // )

  // const roomElements = useMemo(
  //   () =>
  //     textChannels.map((channel, index) => (
  //       <Room
  //         key={index}
  //         name={channel.name}
  //         type={channel.type}
  //         isActive={channel.isActive}
  //         containsUnreadMessages={channel.containsUnreadMessages}
  //         mentionCount={channel.mentionCount}
  //         onClick={channel.onClick}
  //       />
  //     )),
  //   [textChannels]
  // )

  const roomElements = useMemo(
    () =>
      rooms?.map((room, index) => (
        <Room
          key={index}
          name={room.name}
          type={RoomType.Text}
          isActive={false}
          containsUnreadMessages={false}
          mentionCount={0}
          onClick={function (): void {
            throw new Error("Function not implemented.")
          }}
        />
      )),
    [rooms]
  )
  // const spaceElements = useMemo(
  //   () =>
  //     spaces.map((space, index) => (
  //       <Room
  //         key={index}
  //         name={space.name}
  //         type={space.type}
  //         isActive={space.isActive}
  //         containsUnreadMessages={space.containsUnreadMessages}
  //         mentionCount={space.mentionCount}
  //         onClick={space.onClick}
  //       />
  //     )),
  //   [spaces]
  // )

  return (
    <section className="flex h-full flex-col gap-8 p-1 scrollbar-hide">
      <nav className="flex flex-col gap-4">
        <Label text="Spaces" />

        {/* {spaceElements} */}
      </nav>

      <nav className="flex flex-col gap-4">
        <Label text="Channels" />
        {roomElements}
        {/* {roomElements} */}
      </nav>
    </section>
  )
}

export default RoomsList
