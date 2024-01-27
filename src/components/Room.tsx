import {faHashtag, faStarOfLife} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"
import "../styles/Room.sass"
import {assert, trim} from "../utils/util"
import NotificationIndicator from "./NotificationIndicator"

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
  const activeClass = isActive ? "active" : ""

  const icon = type === RoomType.Text ? faHashtag : faStarOfLife
  const mentionCountProp = mentionCount > 0 ? mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div onClick={onClick} className="Room">
      <div className="container">
        <div className="animation-container">
          <FontAwesomeIcon icon={icon} className={"icon " + activeClass} />

          <span className={activeClass + " name"}>
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
