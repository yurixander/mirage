import {useMemo, useState, type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import {saveAs} from "file-saver"
import {IoIosAlert} from "react-icons/io"
import ImageModal from "@/containers/ChatContainer/ImageModal"
import ContextMenu, {
  CONTEXT_MENU_DELETE,
  CONTEXT_MENU_REPLY,
  CONTEXT_MENU_RESEND,
  CONTEXT_MENU_SAVE,
  useContextMenuStore,
  type ContextMenuItem,
} from "./ContextMenu"
import {createPortal} from "react-dom"

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
  const {showMenu} = useContextMenuStore()

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
          onClick: () => {},
        },
        {
          ...CONTEXT_MENU_REPLY,
          onClick: () => {},
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
        <div
          role="button"
          aria-hidden
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
      {isImageModalShowed &&
        createPortal(
          <div className="fixed inset-0 z-50 flex size-full w-screen flex-col items-center justify-center bg-modalOverlay">
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

      <ContextMenu id={timestamp} elements={contextMenuItems}>
        <MessageContainer
          authorDisplayName={authorDisplayName}
          authorDisplayNameColor={authorDisplayNameColor}
          authorAvatarUrl={authorAvatarUrl}
          children={content}
          timestamp={timestamp}
          onAuthorClick={onAuthorClick}
          onMessageRightClick={event => {
            showMenu(timestamp, event)
          }}
        />
      </ContextMenu>
    </>
  )
}

export default ImageMessage
