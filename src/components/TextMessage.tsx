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
  id: number
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
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
    <ContextMenu id={id} items={contextMenuItems}>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}>
        <div className="max-w-[600px] select-text leading-[160%]">{text}</div>
      </MessageContainer>
    </ContextMenu>
  )
}

export default TextMessage
