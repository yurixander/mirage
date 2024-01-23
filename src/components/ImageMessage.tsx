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

export default function ImageMessage(props: ImageMessageProps) {
  const content = (
    <div className="Content">
      <div className="container">
        <img className="image" src={props.imageUrl} />
      </div>

      <div className="text">{props.text}</div>
    </div>
  )

  // NOTE: `id` should be unique for avoid duplicates `ContextMenus`.
  return (
    <ContextMenu
      id={props.id}
      items={contextMenuItems}
      children={
        <div className="ImageMessage">
          <MessageContainer
            authorDisplayName={props.authorDisplayName}
            authorDisplayNameColor={props.authorDisplayNameColor}
            authorAvatarUrl={props.authorAvatarUrl}
            content={content}
            timestamp={props.timestamp}
            onAuthorClick={props.onAuthorClick}
          />
        </div>
      }
    />
  )
}
