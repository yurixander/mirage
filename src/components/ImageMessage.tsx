import {
  faDownload,
  faReply,
  faShare,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"
import ContextMenu from "./ContextMenu"
import MessageContainer from "./MessageContainer"
import {saveAs} from "file-saver"

export type ImageMessageProps = {
  id: string
  imageUrl: string
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
  text: string
  timestamp: number
  onAuthorClick: () => void
  onDeleteMessage?: () => void
}

const ImageMessage: FC<ImageMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  id,
  imageUrl,
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
      label: "Save",
      action: () => {
        saveAs(imageUrl, text)
      },
      icon: faDownload,
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

  const content = (
    <div className="flex flex-col pt-[3px]">
      <img
        className="h-52 w-44 cursor-pointer rounded-[10px] object-contain"
        src={imageUrl}
      />

      <div className="max-w-[600px] select-text leading-[160%]">{text}</div>
    </div>
  )

  // NOTE: `id` attribute should be unique to avoid duplicate context menus.
  return (
    <ContextMenu id={timestamp} items={contextMenuItems}>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        children={content}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}
      />
    </ContextMenu>
  )
}

export default ImageMessage
