import Typography, {TypographyVariant} from "@/components/Typography"
import {emojiRandom} from "@/utils/util"
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
  isSelected?: boolean
  onRoomClick: (roomId: string) => void
}

const Room: FC<RoomProps> = ({
  roomName,
  roomId,
  onRoomClick,
  isSelected = false,
}) => {
  return (
    <button
      onClick={() => {
        onRoomClick(roomId)
      }}
      className={twMerge(
        "flex w-full max-w-40 items-center gap-2 rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200"
      )}>
      <div className="flex size-full max-h-3 max-w-3 items-center justify-center">
        <Typography variant={TypographyVariant.BodyMedium}>
          {emojiRandom()}
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
