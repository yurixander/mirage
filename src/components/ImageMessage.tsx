import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"
import {IoIosAlert} from "react-icons/io"
import ContextMenu from "./ContextMenu"
import {assert, CommonAssertion, validateUrl} from "@/utils/util"

export interface ImageMessageProps extends MessageBaseProps, ImageMessageData {
  onClickImage: (imgUrl: string) => void
}

export interface ImageMessageData extends MessageBaseData {
  imageUrl?: string
}

const ImageMessage: FC<ImageMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  imageUrl,
  onAuthorClick,
  onClickImage,
  timestamp,
  contextMenuItems,
  messageId,
  userId,
}) => {
  if (imageUrl !== undefined) {
    assert(validateUrl(imageUrl), "The image url should be valid.")
  }

  assert(messageId.length > 0, CommonAssertion.MessageIdEmpty)

  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}
      userId={userId}>
      <div className="flex flex-col pt-1">
        {imageUrl === undefined ? (
          <div className="flex flex-row items-center gap-1">
            <IoIosAlert className="text-red-500" />

            <div className="leading-160">
              The image uploaded by the user is currently unavailable.
            </div>
          </div>
        ) : (
          <ContextMenu
            id={`image-menu-${messageId}`}
            elements={contextMenuItems}>
            <button
              className="max-h-52 max-w-44 appearance-none overflow-hidden rounded-xl"
              onClick={() => {
                onClickImage(imageUrl)
              }}>
              <img
                className="cursor-pointer object-contain"
                src={imageUrl}
                alt={`Message by ${authorDisplayName}`}
              />
            </button>
          </ContextMenu>
        )}
      </div>
    </MessageContainer>
  )
}

export default ImageMessage
