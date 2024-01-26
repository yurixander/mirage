import "../styles/Room.sass"
import NotificationIndicator from "./NotificationIndicator"
import {assert, trim} from "../util"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHashtag, faStarOfLife} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"

export enum RoomType {
  Text,
  Space,
}

export type RoomProps = {
  name: string
  type: RoomType
  isActive: boolean
  containsUnreadMessages: boolean
  mentionCount: number
  onClick: () => void
}

const Room: FC<RoomProps> = ({
  name,
  type,
  isActive,
  containsUnreadMessages,
  mentionCount,
  onClick,
}) => {
  assert(name.length !== 0, "room name should not be empty")

  // Determine CSS class to apply based on the active state of the room.
  const classNameActive = isActive ? "active" : ""

  const icon = type === RoomType.Text ? faHashtag : faStarOfLife
  const mentionCountProp = mentionCount > 0 ? mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div onClick={onClick} className="Room">
      <div className="container">
        <div className="animation-container">
          <FontAwesomeIcon icon={icon} className={"icon " + classNameActive} />
          <span className={classNameActive + " name"}>
            {trim(name, MAX_NAME_LENGTH)}
          </span>
        </div>
      </div>
      {containsUnreadMessages && (
        <NotificationIndicator mentionAmount={mentionCountProp} />
      )}
    </div>
  )
}

export default Room
