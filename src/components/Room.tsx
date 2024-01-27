import {faHashtag, faStarOfLife} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC} from "react"
import {assert, trim} from "../utils/util"
import NotificationIndicator from "./NotificationIndicator"
import {twMerge} from "tailwind-merge"

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
  const activeClass = isActive ? "text-primary" : "text-grayText"

  const icon = type === RoomType.Text ? faHashtag : faStarOfLife
  const mentionCountProp = mentionCount > 0 ? mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-row items-center">
      <div className="w-full">
        <div className="group w-max group-active:scale-90 group-active:transition group-active:duration-300">
          <FontAwesomeIcon
            icon={icon}
            className={twMerge(
              "mr-10px group-active:transition-colors group-active:duration-1000 group-active:text-primary",
              activeClass
            )}
          />

          <span
            className={twMerge(
              "mr-auto",
              isActive ? "text-primary" : "text-textColorDefault",
              "group-active:transition-colors group-active:duration-1000 group-active:text-primary"
            )}>
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
