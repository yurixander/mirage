import {type FC} from "react"
import "../styles/ImageMessage.sass"
import ContextMenu from "./ContextMenu"
import MessageContainer from "./MessageContainer"
import {
  faReply,
  faShare,
  faDownload,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"

export type ImageMessageProps = {
  id: number
  imageUrl: string
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

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
    label: "Save",
    action: () => {},
    icon: faDownload,
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

const ImageMessage: FC<ImageMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  id,
  imageUrl,
  onAuthorClick,
  text,
  timestamp,
}) => {
  const content = (
    <div className="Content">
      <div className="container">
        <img className="image" src={imageUrl} />
      </div>
      <div className="text">{text}</div>
    </div>
  )

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu
      id={id}
      items={contextMenuItems}
      children={
        <div className="ImageMessage">
          <MessageContainer
            authorDisplayName={authorDisplayName}
            authorDisplayNameColor={authorDisplayNameColor}
            authorAvatarUrl={authorAvatarUrl}
            content={content}
            timestamp={timestamp}
            onAuthorClick={onAuthorClick}
          />
        </div>
      }
    />
  )
}

export default ImageMessage
