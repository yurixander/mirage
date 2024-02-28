import {
  faReply,
  faShare,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"
import ContextMenu from "./ContextMenu"
import MessageContainer from "./MessageContainer"

export type TextMessageProps = {
  id: string
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
  text: string
  timestamp: number
  onAuthorClick: () => void
  onDeleteMessage?: () => void
}

const TextMessage: FC<TextMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  id,
  onAuthorClick,
  text,
  timestamp,
  onDeleteMessage,
}) => {
  const contextMenuItems = [
    {
      label: "Reply",
      action: () => {},
      icon: faReply,
    },
    {
      label: "Pin",
      action: () => {},
      icon: faThumbTack,
    },
    {
      label: "Resend",
      action: () => {},
      icon: faShare,
    },
    {
      label: "Delete",
      action: onDeleteMessage ?? (() => {}),
      icon: faTrash,
    },
  ]

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu id={timestamp} items={contextMenuItems}>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}>
        <div className="max-w-messageMaxWidth select-text break-words leading-[160%]">
          {text}
        </div>
      </MessageContainer>
    </ContextMenu>
  )
}

export default TextMessage
