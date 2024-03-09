import {faReply, faShare, faTrash} from "@fortawesome/free-solid-svg-icons"
import {useMemo, type FC} from "react"
import ContextMenu from "./ContextMenu"
import MessageContainer, {type MessageBaseProps as MessageBaseProperties} from "./MessageContainer"

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
    const items = []

    items.push(
      {
        label: "Reply",
        action: () => {},
        icon: faReply,
      },
      {
        label: "Resend",
        action: () => {},
        icon: faShare,
      }
    )

    if (onDeleteMessage !== undefined) {
      items.push({
        label: "Delete",
        action: onDeleteMessage,
        icon: faTrash,
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
