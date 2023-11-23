import "../styles/Room.sass"
import {ReactComponent as HashIcon} from "../../public/icons/hash.svg"
import {ReactComponent as StarIcon} from "../../public/icons/star.svg"
import NotificationIndicator from "./NotificationIndicator"
import {assert, trim} from "../util"

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
  let icon: JSX.Element

  switch (props.type) {
    case RoomType.Text: icon = <HashIcon className={"icon " + classNameActive} />; break
    case RoomType.Space: icon = <StarIcon className={"icon " + classNameActive} />; break
  }

  const mentionCountProp = props.mentionCount > 0 ? props.mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div onClick={props.onClick} className="Room">
      {icon}
      <span className={classNameActive}>{trim(props.name, MAX_NAME_LENGTH)}</span>
      {props.containsUnreadMessages && <NotificationIndicator mentionAmount={mentionCountProp} />}
    </div>
  )
}
