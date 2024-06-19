import {useMemo, useState, type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {saveAs} from "file-saver"
import {IoIosAlert} from "react-icons/io"
import ImageModal from "@/containers/ChatContainer/ImageModal"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import {createPortal} from "react-dom"
import {
  CONTEXT_MENU_DELETE,
  CONTEXT_MENU_REPLY,
  CONTEXT_MENU_RESEND,
  CONTEXT_MENU_SAVE,
} from "@/utils/menu"
import {generateUniqueNumber} from "@/utils/util"

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
          ...CONTEXT_MENU_SAVE,
          onClick: () => {
            saveAs(imageUrl, text)
          },
        },
        {
          ...CONTEXT_MENU_RESEND,
          onClick: () => {
            throw new Error("Handle resend message.")
          },
        },
        {
          ...CONTEXT_MENU_REPLY,
          onClick: () => {
            throw new Error("Handle reply message.")
          },
        }
      )
    }

    if (onDeleteMessage !== undefined) {
      items.push({
        ...CONTEXT_MENU_DELETE,
        onClick: onDeleteMessage,
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
        <ContextMenu id={generateUniqueNumber()} elements={contextMenuItems}>
          <button
            className="max-h-52 max-w-44 appearance-none overflow-hidden rounded-xl"
            onClick={() => {
              setImageModalShow(true)
            }}>
            <img
              className="cursor-pointer object-contain"
              src={imageUrl}
              alt={text}
            />
          </button>
        </ContextMenu>
      )}
    </div>
  )

  return (
    <>
      {isImageModalShowed &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-modalOverlay">
            <ImageModal
              onDeleteImage={onDeleteMessage}
              imageUrl={imageUrl}
              onClose={() => {
                setImageModalShow(false)
              }}
            />
          </div>,
          document.body
        )}

      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        authorAvatarUrl={authorAvatarUrl}
        children={content}
        timestamp={timestamp}
        onAuthorClick={onAuthorClick}
      />
    </>
  )
}

export default ImageMessage
