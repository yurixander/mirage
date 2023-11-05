import "../styles/RoomsBar.sass"
import {faCircleUser, faCog, faRightFromBracket, faToolbox} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useNavigate} from "react-router-dom"
import {Path} from ".."

export type Room = {
  id: string,
  name: string,
  avatarUrl: string,
}

type Props = {
  rooms: Room[],
  activeRoomId: string | null,
  avatarBaseUrl: string,
  onRoomClick: (room: Room) => void,
  onDeveloperToolsClick: () => void,
}

export default function RoomsBar(props: Props) {
  const navigate = useNavigate()

  return <div className="rooms">
    <div className="section">
      {props.rooms.map((room, index) =>
        <img
          className="item"
          key={index}
          data-id={index}
          data-active={props.activeRoomId && props.activeRoomId === room.id}
          onClick={_ => props.onRoomClick(room)}
          alt={room.name}
          src={room.avatarUrl}
          width={50}
          height={50}
        />
      )}
    </div>
    <div className="section">
      <FontAwesomeIcon className="item icon" icon={faCircleUser} title="My profile" />
      <FontAwesomeIcon className="item icon" icon={faCog} title="Settings" />
      <FontAwesomeIcon
        onClick={() => navigate(Path.Login)}
        className="item icon"
        icon={faRightFromBracket}
        title="Sign out"
      />
      <FontAwesomeIcon
        onClick={props.onDeveloperToolsClick}
        className="item icon developer-tools"
        icon={faToolbox}
        title="Developer tools"
      />
    </div>
  </div>
}
