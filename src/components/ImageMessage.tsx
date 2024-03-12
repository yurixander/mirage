import {useMemo, type FC} from "react"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import MessageContainer, {
  type MessageBaseProps as MessageBaseProperties,
} from "./MessageContainer"
import {saveAs} from "file-saver"
import {IoMdDownload, IoIosAlert, IoMdTrash} from "react-icons/io"
import {IoArrowUndo, IoArrowRedo} from "react-icons/io5"

export type ImageMessageProps = MessageBaseProperties & {
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
    const items: ContextMenuItem[] = []

    if (imageUrl !== undefined) {
      items.push(
        {
          label: "Save",
          action: () => {
            saveAs(imageUrl, text)
          },
          icon: <IoMdDownload />,
        },
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
    }

    if (onDeleteMessage !== undefined) {
      items.push({
        label: "Delete",
        action: onDeleteMessage,
        icon: <IoMdTrash />,
      })
    }

    return items
  }, [imageUrl, onDeleteMessage, text])

  const content = (
    <div className="flex flex-col pt-[3px]">
      {imageUrl === null ? (
        <div className="flex flex-row items-center gap-1">
          <IoIosAlert className="text-red-500" />
          <div className="leading-160">
            The image uploaded by the user is currently unavailable.
          </div>
        </div>
      ) : (
        <img
          className="h-52 w-44 cursor-pointer rounded-xl object-contain"
          src={imageUrl}
          alt={text}
        />
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
