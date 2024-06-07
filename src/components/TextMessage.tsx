import {useMemo, type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import ContextMenu, {
  CONTEXT_MENU_DELETE,
  CONTEXT_MENU_REPLY,
  CONTEXT_MENU_RESEND,
  useContextMenuStore,
  type ContextMenuItem,
} from "./ContextMenu"

const TextMessage: FC<MessageBaseProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  onAuthorClick,
  text,
  timestamp,
  onDeleteMessage,
}) => {
  const {showMenu} = useContextMenuStore()

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
          onAuthorClick={onAuthorClick}
          onMessageRightClick={event => {
            showMenu(timestamp, event)
          }}>
          <div className="max-w-messageMaxWidth select-text break-words leading-160">
            {/* TODO: Process line breaks (\n). */}
            {text}
          </div>
        </MessageContainer>
      </ContextMenu>
    </>
  )
}

export default TextMessage
