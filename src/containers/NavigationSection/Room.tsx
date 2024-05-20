import Typography, {TypographyVariant} from "@/components/Typography"
import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RoomProps = {
  roomName: string
  tagEmoji: string
  roomId: string
  isSelected?: boolean
  onRoomClick: (roomId: string) => void
}

const Room: FC<RoomProps> = ({
  roomName,
  tagEmoji,
  onRoomClick,
  roomId,
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
      onClick={() => {
        onRoomClick(roomId)
      }}>
      <Typography variant={TypographyVariant.P}>{tagEmoji}</Typography>

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
