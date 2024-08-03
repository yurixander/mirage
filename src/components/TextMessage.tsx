import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"
import ContextMenu from "./ContextMenu"
import Typography, {TypographyVariant} from "./Typography"

export interface TextMessageProps extends MessageBaseProps {
  text: string
}

export interface TextMessageData extends MessageBaseData {
  text: string
  isDeleted?: boolean
}

const TextMessage: FC<TextMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  onAuthorClick,
  text,
  timestamp,
  contextMenuItems,
  messageId,
}) => {
  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}>
      <ContextMenu id={`text-message-${messageId}`} elements={contextMenuItems}>
        <Typography
          className="max-w-messageMaxWidth cursor-text select-text break-words"
          variant={TypographyVariant.Body}>
          {text.split(/(\n)/).map(line => (line === "\n" ? <br /> : line))}
        </Typography>
      </ContextMenu>
    </MessageContainer>
  )
}

export default TextMessage
