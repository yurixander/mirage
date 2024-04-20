import IconButton from "@/components/IconButton"
import {type FC} from "react"
import {saveAs} from "file-saver"
import {IoMdDownload, IoMdTrash} from "react-icons/io"
import {
  IoArrowRedo,
  IoArrowUndo,
  IoCloseCircle,
  IoInformationCircle,
} from "react-icons/io5"
import ImageZoom from "@/components/ImageZoom"
import Typography from "@/components/Typography"

export type ImageModalProps = {
  imageUrl?: string
  onClose: () => void
  onDeleteImage?: () => void
}

const ImageModal: FC<ImageModalProps> = ({
  imageUrl,
  onDeleteImage,
  onClose,
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center  bg-modalOverlay">
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

        {imageUrl !== undefined && (
          <div>
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
                saveAs(imageUrl)
              }}
            />
          </div>
        )}

        <IconButton
          size={26}
          tooltip="Close image"
          Icon={IoCloseCircle}
          onClick={onClose}
        />
      </div>

      <div className="flex size-full items-center justify-center">
        {imageUrl === undefined ? (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-2">
            <IoInformationCircle size={28} color="red" />

            <Typography>An error occurred while loading the image</Typography>
          </div>
        ) : (
          <ImageZoom src={imageUrl} />
        )}
      </div>
    </div>
  )
}

export default ImageModal
