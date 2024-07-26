import {type FC} from "react"
import {IoPlay} from "react-icons/io5"
import Typography, {TypographyVariant} from "./Typography"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {type ContextMenuItem} from "./ContextMenu"
import {formatTime} from "@/utils/util"

export type AudioMessageProps = {
  authorDisplayName: string
  timestamp: number
  id: string
  contextMenuItems: ContextMenuItem[]
  onAuthorClick: () => void
  authorAvatarUrl?: string
}

const AudioMessage: FC<AudioMessageProps> = ({
  contextMenuItems,
  id,
  onAuthorClick,
  timestamp,
  authorAvatarUrl,
  authorDisplayName,
}) => {
  return (
    <div className="flex size-full max-h-14 max-w-60 items-center rounded-xl border-2 border-gray-100 bg-white p-2 shadow-sm">
      <IoPlay
        className="shrink-0 cursor-pointer text-purple-500"
        onClick={() => {
          // TODO: Handle audio playback here.
        }}
      />

      <div className="ml-auto flex items-center gap-2">
        <Typography variant={TypographyVariant.Heading}>
          {formatTime(timestamp)}
        </Typography>

        <AvatarImage
          isRounded
          avatarType={AvatarType.Profile}
          displayName={authorDisplayName}
          avatarUrl={authorAvatarUrl}
        />
      </div>
    </div>
  )
}

export default AudioMessage
