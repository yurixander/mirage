import Typography, {TypographyVariant} from "@/components/Typography"
import {type PartialRoom} from "@/containers/NavigationSection/SpaceList"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RoomProps = {
  roomName: string
  tagEmoji: string
  isSelected?: boolean
  onRoomClick: () => void
}

export const hasRoomRepeat = (
  room1: PartialRoom,
  room2: PartialRoom
): boolean => {
  return room1.roomId === room2.roomId
}

const Room: FC<RoomProps> = ({
  roomName,
  tagEmoji,
  onRoomClick,
  isSelected = false,
}) => {
  return (
    <button
      onClick={onRoomClick}
      className={twMerge(
        "flex items-center gap-2 rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200"
      )}>
      <div className="flex size-full max-h-3 max-w-3 items-center justify-center">
        <Typography variant={TypographyVariant.BodyMedium}>
          {tagEmoji}
        </Typography>
      </div>

      <Typography
        variant={TypographyVariant.BodySmall}
        className={twMerge(
          "line-clamp-1 font-bold",
          isSelected ? "text-white" : "text-slate-500"
        )}>
        {roomName}
      </Typography>
    </button>
  )
}

export default Room
