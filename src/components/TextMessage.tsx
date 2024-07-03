import {type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import ContextMenu from "./ContextMenu"
import Typography, {TypographyVariant} from "./Typography"

const TextMessage: FC<MessageBaseProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  onAuthorClick,
  text,
  timestamp,
  contextMenuItems,
  id,
}) => {
  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}>
      <ContextMenu
        className="flex flex-col"
        id={`text-message-${id}`}
        elements={contextMenuItems}>
        {text.split("\n").map((line, index) => (
          <Typography
            key={index}
            className="max-w-messageMaxWidth cursor-text select-text break-words"
            variant={TypographyVariant.Body}>
            {line}
          </Typography>
        ))}
      </ContextMenu>
    </MessageContainer>
  )
}

export default TextMessage
