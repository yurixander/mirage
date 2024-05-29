import Typography, {TypographyVariant} from "@/components/Typography"
import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {type PartialRoom} from "./SpaceList"

export type RoomProps = {
  roomName: string
  tagEmoji: string
  isSelected?: boolean
  onRoomClick: () => void
}

export const hasRoomRepeat = (
  room1: PartialRoom,
  room2: PartialRoom
): boolean => room1.roomId === room2.roomId

const Room: FC<RoomProps> = ({
  roomName,
  tagEmoji,
  onRoomClick,
  isSelected = false,
}) => {
  return (
    <div
      className={twMerge(
        "flex gap-2 rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200"
      )}
      role="button"
      aria-hidden="true"
      onClick={onRoomClick}>
      <div className="flex size-full max-h-3 max-w-3 items-center justify-center">
        <Typography variant={TypographyVariant.P}>{tagEmoji}</Typography>
      </div>

      <Typography
        variant={TypographyVariant.P}
        className={twMerge(
          "line-clamp-1 font-bold",
          isSelected ? "text-white" : "text-slate-500"
        )}>
        {roomName}
      </Typography>
    </div>
  )
}

export default memo(Room)
