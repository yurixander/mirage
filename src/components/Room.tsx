import Typography, {TypographyVariant} from "@/components/Typography"
import {assert} from "@/utils/util"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum RoomType {
  Direct,
  Group,
}

export type RoomProps = {
  roomName: string
  roomId: string
  type: RoomType
  emoji: string
  isSelected?: boolean
  onRoomClick: (roomId: string) => void
}

const Room: FC<RoomProps> = ({
  roomName,
  roomId,
  onRoomClick,
  emoji,
  isSelected = false,
}) => {
  assert(roomName.length > 0, "Room name should not be empty.")
  assert(roomId.length > 0, "Room id should not be empty.")
  assert(emoji.length === 1, "The emoji should be a single character.")

  return (
    <button
      onClick={() => {
        onRoomClick(roomId)
      }}
      className={twMerge(
        "flex w-full items-center gap-2 rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200"
      )}>
      <div className="flex size-full max-h-3 max-w-3 items-center justify-center">
        <Typography variant={TypographyVariant.BodyMedium}>{emoji}</Typography>
      </div>

      <Typography
        variant={TypographyVariant.BodySmall}
        className={twMerge(
          "line-clamp-1 font-medium",
          isSelected ? "text-white" : "text-slate-600"
        )}>
        {roomName}
      </Typography>
    </button>
  )
}

export default Room
