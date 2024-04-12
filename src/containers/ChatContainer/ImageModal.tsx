import IconButton from "@/components/IconButton"
import {type FC} from "react"
import {saveAs} from "file-saver"
import {IoMdDownload, IoMdTrash} from "react-icons/io"
import {IoArrowRedo, IoArrowUndo, IoCloseCircle} from "react-icons/io5"

export type ImageModalProps = {
  imageUrl?: string
  onClose: () => void
  onDeleteImage?: () => void
}

// TODO: Handle when the imageUrl is undefined.
const ImageModal: FC<ImageModalProps> = ({
  imageUrl,
  onDeleteImage,
  onClose,
}) => {
  return (
    <div className="flex size-full flex-col bg-modalOverlay">
      <div className="ml-auto flex gap-1 p-2">
        {onDeleteImage !== undefined && (
          <IconButton
            size={26}
            tooltip="Delete image message"
            Icon={IoMdTrash}
            onClick={() => {
              onDeleteImage()
              onClose()
            }}
          />
        )}

        <IconButton
          size={26}
          tooltip="Resend image message"
          Icon={IoArrowRedo}
          onClick={function (): void {
            throw new Error("Resend image message not implemented.")
          }}
        />

        <IconButton
          size={26}
          tooltip="Reply image message"
          Icon={IoArrowUndo}
          onClick={function (): void {
            throw new Error("Reply message not implemented.")
          }}
        />

        <IconButton
          size={26}
          tooltip="Download Image"
          Icon={IoMdDownload}
          onClick={() => {
            if (imageUrl === undefined) {
              return
            }

            saveAs(imageUrl)
          }}
        />

        <IconButton
          size={26}
          tooltip="Close image"
          Icon={IoCloseCircle}
          onClick={onClose}
        />
      </div>

      <div className="flex size-full items-center justify-center overflow-auto">
        <img
          className="max-w-full object-fill"
          src={imageUrl}
          alt="Message content"
        />
      </div>
    </div>
  )
}

export default ImageModal
