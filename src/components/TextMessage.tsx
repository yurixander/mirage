import {useMemo, type FC} from "react"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import MessageContainer, {
  type MessageBaseProps as MessageBaseProperties,
} from "./MessageContainer"
import {IoArrowUndo, IoTrash, IoArrowRedo} from "react-icons/io5"
import {IoMdTrash} from "react-icons/io"

export type TextMessageProps = MessageBaseProperties & {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
  text: string
  timestamp: number
  onAuthorClick: () => void
  onDeleteMessage?: () => void
}

const TextMessage: FC<MessageBaseProperties> = ({
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
          {text}
        </div>
      </MessageContainer>
    </ContextMenu>
  )
}

export default TextMessage
