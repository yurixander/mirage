import {type FC} from "react"
import Typography, {TypographyVariant} from "@/components/Typography"

const RoomNotFoundSplash: FC = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <Typography variant={TypographyVariant.HeadingLarge}>
        Room Not Found
      </Typography>

      <Typography>
        You not have access to this room or this room not found.
      </Typography>
    </div>
  )
}

export default RoomNotFoundSplash
