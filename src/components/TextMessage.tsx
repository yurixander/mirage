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
}) => {
  const contextMenuItems = useMemo(() => {
    const items: ContextMenuItem[] = [
      {...CONTEXT_MENU_REPLY, onClick: () => {}},
      {...CONTEXT_MENU_RESEND, onClick: () => {}},
    ]

    if (onDeleteMessage !== undefined) {
      items.push({...CONTEXT_MENU_DELETE, onClick: onDeleteMessage})
    }

    return items
  }, [onDeleteMessage])

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <>
      <ContextMenu id={timestamp} elements={contextMenuItems}>
        <MessageContainer
          authorDisplayName={authorDisplayName}
          authorDisplayNameColor={authorDisplayNameColor}
          authorAvatarUrl={authorAvatarUrl}
          timestamp={timestamp}
          onAuthorClick={onAuthorClick}>
          <Typography
            className="max-w-messageMaxWidth select-text break-words"
            variant={TypographyVariant.Body}>
            {/* TODO: Process line breaks (\n). */}
            {text}
          </Typography>
        </MessageContainer>
      </ContextMenu>
    </>
  )
}

export default TextMessage
