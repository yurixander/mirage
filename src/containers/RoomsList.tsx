import {useEffect, type FC} from "react"
import Label from "../components/Label"
import useClient from "@/hooks/matrix/useClient"
import useCredentials from "@/hooks/matrix/useCredentials"
import useRooms from "@/hooks/matrix/useRooms"

const RoomsList: FC = () => {
  const {connect, client, isConnected} = useClient()
  const {credentials} = useCredentials()
  const {rooms, refreshRooms} = useRooms()

  useEffect(() => {
    if (credentials === undefined || (client !== null && client.isLoggedIn())) {
      return
    }

    void connect(credentials)
  }, [])

  useEffect(() => {
    if (client === null || !isConnected) {
      return
    }

    refreshRooms(client)
  }, [isConnected, client])

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
