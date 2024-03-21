import {type FC} from "react"
import {assert, trim} from "../utils/util"
import NotificationIndicator from "./NotificationIndicator"
import {twMerge} from "tailwind-merge"
import {LiaSlackHash} from "react-icons/lia"
import {IoMedical} from "react-icons/io5"

export enum RoomType {
  Direct,
  Group,
  Space,
}

export type RoomProps = {
  roomId: string
  name: string
  type: RoomType
  isActive: boolean
  containsUnreadMessages: boolean
  mentionCount: number
  onClick: () => void
  lastMsgSentDate?: string
}

const Room: FC<RoomProps> = ({
  name,
  isActive,
  containsUnreadMessages,
  mentionCount,
  onClick,
  type,
}) => {
  assert(name.length > 0, "room name should not be empty")

  const activeClass = isActive ? "text-purple-500" : "text-gray-300"
  const mentionCountProperty = mentionCount > 0 ? mentionCount : undefined
  const MAX_NAME_LENGTH = 16
  const Icon = type === RoomType.Direct ? IoMedical : LiaSlackHash

  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-row items-center"
      aria-hidden="true">
      <div className="w-full">
        <div className="group flex w-max flex-row gap-1 group-active:scale-90 group-active:transition group-active:duration-300">
          <Icon
            className={twMerge(
              "group-active:text-purple-500 group-active:transition-colors group-active:duration-1000",
              activeClass
            )}
          />

          <span
            className={twMerge(
              "mr-auto",
              isActive ? "text-purple-500" : "text-stone-600",
              "group-active:text-purple-500 group-active:transition-colors group-active:duration-1000"
            )}>
            {trim(name, MAX_NAME_LENGTH)}
          </span>
        </div>
      </div>

      {containsUnreadMessages && (
        <NotificationIndicator mentionAmount={mentionCountProperty} />
      )}
    </div>
  )
}

export default Room
