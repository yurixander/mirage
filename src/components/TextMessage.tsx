import {useMemo, type FC} from "react"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {IoArrowUndo, IoArrowRedo} from "react-icons/io5"
import {IoMdTrash} from "react-icons/io"

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
        label: "Reply",
        action: () => {},
        icon: <IoArrowUndo />,
      },
      {
        label: "Resend",
        action: () => {},
        icon: <IoArrowRedo />,
      }
    )

    if (onDeleteMessage !== undefined) {
      items.push({
        label: "Delete",
        action: onDeleteMessage,
        icon: <IoMdTrash />,
      })
    }

    return items
  }, [onDeleteMessage])

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu id={timestamp} items={contextMenuItems}>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}>
        <div className="max-w-messageMaxWidth select-text break-words leading-160">
          // TODO: Process line breaks (\n).
          {text}
        </div>
      </MessageContainer>
    </ContextMenu>
  )
}

export default TextMessage
