import {useMemo, type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {IoArrowUndo, IoArrowRedo} from "react-icons/io5"
import {IoMdTrash} from "react-icons/io"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"

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
    const items: ContextMenuItem[] = []

    items.push(
      {
        text: "Reply",
        onClick: () => {},
        icon: IoArrowUndo,
      },
      {
        text: "Resend",
        onClick: () => {},
        icon: IoArrowRedo,
      }
    )

    if (onDeleteMessage !== undefined) {
      items.push({
        text: "Delete",
        onClick: onDeleteMessage,
        icon: IoMdTrash,
        color: "red",
      })
    }

    return items
  }, [onDeleteMessage])

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu id={timestamp} elements={contextMenuItems}>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}>
        <div className="max-w-messageMaxWidth select-text break-words leading-160">
          {/* TODO: Process line breaks (\n). */}
          {text}
        </div>
      </MessageContainer>
    </ContextMenu>
  )
}

export default TextMessage
