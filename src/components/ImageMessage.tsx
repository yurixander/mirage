import {useMemo, useState, type FC} from "react"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {saveAs} from "file-saver"
import {IoMdDownload, IoIosAlert, IoMdTrash} from "react-icons/io"
import {IoArrowUndo, IoArrowRedo} from "react-icons/io5"
import ImageModal from "@/containers/ChatContainer/ImageModal"
import Modal from "./Modal"

export interface ImageMessageProps extends MessageBaseProps {
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
  const [isImageModalShowed, setImageModalShow] = useState(false)

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
    <div className="flex flex-col pt-1">
      {imageUrl === null ? (
        <div className="flex flex-row items-center gap-1">
          <IoIosAlert className="text-red-500" />

          <div className="leading-160">
            The image uploaded by the user is currently unavailable.
          </div>
        </div>
      ) : (
        // TODO: Handle image size here. Preferably, make the component accept 'imageDimensions' as props.
        // TODO: Add keyboard event listener for accessibility.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          role="button"
          tabIndex={0}
          className="max-h-52 max-w-44 overflow-hidden rounded-xl"
          onClick={() => {
            setImageModalShow(true)
          }}>
          <img
            className="cursor-pointer object-contain"
            src={imageUrl}
            alt={text}
          />
        </div>
      )}

      <div className="max-w-messageMaxWidth select-text leading-160">
        {text}
      </div>
    </div>
  )

  // NOTE: `id` attribute should be unique to avoid duplicate context menus.
  return (
    <>
      <Modal
        isVisible={isImageModalShowed}
        children={
          <ImageModal
            onDeleteImage={onDeleteMessage}
            imageUrl={imageUrl}
            onClose={() => {
              setImageModalShow(false)
            }}
          />
        }
      />
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
    </>
  )
}

export default ImageMessage
