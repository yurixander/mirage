import "../styles/Room.sass"
import NotificationIndicator from "./NotificationIndicator"
import {assert, trim} from "../util"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHashtag, faStarOfLife} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from "@fortawesome/fontawesome-svg-core"


export enum RoomType {
  Text,
  Space
}

export type RoomProps = {
  name: string
  type: RoomType
  isActive: boolean
  containsUnreadMessages: boolean
  mentionCount: number
  onClick: () => void
}

export default function Room(props: RoomProps) {
  assert(props.name.length !== 0, "room name should not be empty")

  // Determine CSS class to apply based on the active state of the room.
  const classNameActive = props.isActive ? "active" : ""
  let icon: IconProp = props.type === RoomType.Text ? faHashtag : faStarOfLife

  const mentionCountProp = props.mentionCount > 0 ? props.mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div onClick={props.onClick} className="Room">
      <FontAwesomeIcon
        icon={icon}
        className={"icon " + classNameActive} />
      <span className={classNameActive}>{trim(props.name, MAX_NAME_LENGTH)}</span>
      {props.containsUnreadMessages && <NotificationIndicator mentionAmount={mentionCountProp} />}
    </div>
  )
}
