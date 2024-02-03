// import {type MatrixEventCallback} from "@/hooks/matrix/useEventListener"
// import useMatrix from "@/hooks/matrix/useMatrix"
// import useSyncedMap from "@/hooks/matrix/useSyncedMap"
// import {ClientEvent, Room, RoomType} from "matrix-js-sdk"
// import {useMemo, type FC} from "react"
import {type FC} from "react"
import Label from "../components/Label"

const RoomsList: FC = () => {
  // TODO: Continue implementation.

  // const fetchRooms = useMatrix(
  //   async client => await Promise.resolve(client.getRooms())
  // )

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

  // const spaces = useMemo(
  //   () =>
  //     Array.from(rooms.values()).filter(
  //       room => room.getType() === RoomType.Space
  //     ),
  //   [rooms]
  // )

  // const textChannels = useMemo(
  //   () => rooms.filter(room => room.type === RoomType.Text),
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

        {/* {roomElements} */}
      </nav>
    </section>
  )
}

export default RoomsList
