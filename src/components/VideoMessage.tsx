import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"

export interface VideoMessageData extends MessageBaseData {
  url: string
}

export interface VideoMessageProps extends MessageBaseProps {
  url: string
}

const VideoMessage: FC<VideoMessageProps> = ({
  authorDisplayName,
  authorAvatarUrl,
  authorDisplayNameColor,
  contextMenuItems,
  messageId,
  onAuthorClick,
  timestamp,
  userId,
  url,
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
      <div className="w-80 items-center justify-center rounded border bg-slate-200">
        <video src={url} controls className="rounded" width={320} />
      </div>
    </MessageContainer>
  )
}

export default VideoMessage
