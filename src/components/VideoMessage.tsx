import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"

export interface VideoMessageData extends MessageBaseData {
  url: string
  thumbnail?: string
}

export interface VideoMessageProps extends MessageBaseProps {
  url: string
  thumbnail?: string
}

// TODO: @lazaroysr96 Handle context menu and messageId
const VideoMessage: FC<VideoMessageProps> = ({
  authorDisplayName,
  authorAvatarUrl,
  authorDisplayNameColor,
  onAuthorClick,
  timestamp,
  userId,
  url,
  thumbnail,
}) => {
  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorAvatarUrl={authorAvatarUrl}
      authorDisplayNameColor={authorDisplayNameColor}
      userId={userId}
      onAuthorClick={() => {
        onAuthorClick(userId)
      }}
      timestamp={timestamp}>
      <div className="max-h-80 max-w-80 items-center justify-center rounded border bg-black">
        <video
          src={url}
          controls
          className="size-full rounded shadow"
          poster={thumbnail}
        />
      </div>
    </MessageContainer>
  )
}

export default VideoMessage
