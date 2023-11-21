import Room, {RoomProps, RoomType} from "./Room"
import "../styles/ServerSections.sass"
import Label from "./Label"

export type ServerSectionsProps = {
  rooms: RoomProps[]
}

export default function ServerSections(props: ServerSectionsProps) {
  const spaces = props.rooms.filter(room => room.type === RoomType.Space)
  const channels = props.rooms.filter(room => room.type === RoomType.Text)

  return (
    <div className="ServerSection">
      <div className="spaces">
        <Label text={"Spaces"} />
        {spaces.map(space =>
          <Room
            name={space.name}
            type={space.type}
            isActive={space.isActive}
            containsUnreadMessages={space.containsUnreadMessages}
            mentionCount={space.mentionCount}
            onClick={space.onClick} />)}
      </div>
      <div className="channels">
        <Label text={"Channels"} />
        {channels.map(channel =>
          <Room
            name={channel.name}
            type={channel.type}
            isActive={channel.isActive}
            containsUnreadMessages={channel.containsUnreadMessages}
            mentionCount={channel.mentionCount}
            onClick={channel.onClick} />)}
      </div>
    </div>
  )
}
