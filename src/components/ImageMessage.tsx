import {
  faDownload,
  faReply,
  faShare,
  faTrash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import {useMemo, type FC} from "react"
import ContextMenu from "./ContextMenu"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {saveAs} from "file-saver"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export type ImageMessageProps = MessageBaseProps & {
  imageUrl?: string
}

const ImageMessage: FC<ImageMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  imageUrl,
  onAuthorClick,
  text,
  timestamp,
  onDeleteMessage,
}) => {
  const contextMenuItems = useMemo(() => {
    const items = []

    if (imageUrl !== undefined) {
      items.push(
        {
          label: "Save",
          action: () => {
            saveAs(imageUrl, text)
          },
          icon: faDownload,
        },
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
    }

    if (onDeleteMessage !== undefined) {
      items.push({
        label: "Delete",
        action: onDeleteMessage,
        icon: faTrash,
      })
    }

    return items
  }, [imageUrl, onDeleteMessage, text])

  const content = (
    <div className="flex flex-col pt-[3px]">
      {imageUrl !== null ? (
        <img
          className="h-52 w-44 cursor-pointer rounded-[10px] object-contain"
          src={imageUrl}
        />
      ) : (
        <div className="flex flex-row items-center gap-1">
          <FontAwesomeIcon
            className="text-red-500"
            icon={faCircleExclamation}
          />
          <div className="leading-160">
            The image uploaded by the user is currently unavailable.
          </div>
        </div>
      )}

      <div className="max-w-messageMaxWidth select-text leading-160">
        {text}
      </div>
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
