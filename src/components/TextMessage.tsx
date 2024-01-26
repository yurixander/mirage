import "../styles/TextMessage.sass"
import ContextMenu from "./ContextMenu"
import {
  faReply,
  faShare,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import MessageContainer from "./MessageContainer"
import {type FC} from "react"

export type TextMessageProps = {
  id: number
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

const TextMessage: FC<TextMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  id,
  onAuthorClick,
  text,
  timestamp,
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
      action: () => {},
      icon: faTrash,
    },
  ]

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu
      id={id}
      items={contextMenuItems}
      children={
        <MessageContainer
          authorDisplayName={authorDisplayName}
          authorDisplayNameColor={authorDisplayNameColor}
          authorAvatarUrl={authorAvatarUrl}
          content={<div className="message-text">{text}</div>}
          timestamp={timestamp}
          onAuthorClick={onAuthorClick}
        />
      }
    />
  )
}

export default TextMessage
