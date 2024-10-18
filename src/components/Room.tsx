import Typography, {TypographyVariant} from "@/components/Typography"
import {assert} from "@/utils/util"
import type {FC} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

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
  className?: string
}

const Room: FC<RoomProps> = ({
  roomName,
  roomId,
  onRoomClick,
  emoji,
  isSelected = false,
  className,
}) => {
  assert(roomName.length > 0, "Room name should not be empty.")
  assert(roomId.length > 0, "Room id should not be empty.")

  return (
    <motion.button
      whileTap={{scale: 0.95}}
      onClick={() => {
        onRoomClick(roomId)
      }}
      className={twMerge(
        "relative w-full rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200",
        className
      )}>
      <motion.div
        className="flex w-max items-center gap-2"
        initial={{translateX: -25, opacity: 0.5}}
        whileInView={{translateX: 0, opacity: 1}}
        transition={{
          duration: 0.2,
        }}>
        <div className="flex size-full max-h-3 max-w-3 items-center justify-center">
          <Typography variant={TypographyVariant.BodyMedium}>
            {emoji}
          </Typography>
        </div>

        <Typography
          variant={TypographyVariant.BodySmall}
          className={twMerge(
            "line-clamp-1 max-w-40 font-medium",
            isSelected ? "text-white" : "text-slate-600"
          )}>
          {roomName}
        </Typography>
      </motion.div>
    </motion.button>
  )
}

export default Room
