import {useMemo, type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import Typography, {TypographyVariant} from "./Typography"
import {
  CONTEXT_MENU_DELETE,
  CONTEXT_MENU_REPLY,
  CONTEXT_MENU_RESEND,
} from "@/utils/menu"

const TextMessage: FC<MessageBaseProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  onAuthorClick,
  text,
  timestamp,
  onDeleteMessage,
  id,
}) => {
  const contextMenuItems = useMemo(() => {
    const items: ContextMenuItem[] = [
      {
        ...CONTEXT_MENU_REPLY,
        onClick: () => {
          throw new Error("Reply message not handled.")
        },
      },
      {
        ...CONTEXT_MENU_RESEND,
        onClick: () => {
          throw new Error("Resend message not handled.")
        },
      },
    ]

    if (onDeleteMessage !== undefined) {
      items.push({...CONTEXT_MENU_DELETE, onClick: onDeleteMessage})
    }

    return items
  }, [onDeleteMessage])

  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}>
      <ContextMenu id={`text-message-${id}`} elements={contextMenuItems}>
        <Typography
          className="max-w-messageMaxWidth cursor-text select-text break-words"
          variant={TypographyVariant.Body}>
          {/* TODO: Process line breaks (\n). */}
          {text}
        </Typography>
      </ContextMenu>
    </MessageContainer>
  )
}

export default TextMessage
