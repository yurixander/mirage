import Room, {type RoomProps, RoomType} from "./Room"
import "../styles/RoomsList.sass"
import Label from "./Label"
import {type FC} from "react"

export type RoomsListProps = {
  rooms: RoomProps[]
}

const RoomsList: FC<RoomsListProps> = ({rooms}) => {
  const spaces = rooms.filter(room => room.type === RoomType.Space)
  const textChannels = rooms.filter(room => room.type === RoomType.Text)

  return (
    <section className="RoomsList">
      <nav className="spaces">
        <Label text={"Spaces"} />

        {spaces.map((space, index) => (
          <Room
            key={index}
            name={space.name}
            type={space.type}
            isActive={space.isActive}
            containsUnreadMessages={space.containsUnreadMessages}
            mentionCount={space.mentionCount}
            onClick={space.onClick}
          />
        ))}
      </nav>

      <nav className="channels">
        <Label text={"Channels"} />

        {textChannels.map((channel, index) => (
          <Room
            key={index}
            name={channel.name}
            type={channel.type}
            isActive={channel.isActive}
            containsUnreadMessages={channel.containsUnreadMessages}
            mentionCount={channel.mentionCount}
            onClick={channel.onClick}
          />
        ))}
      </nav>
    </section>
  )
}

export default RoomsList
