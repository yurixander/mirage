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
import {useTranslation} from "react-i18next"

const ICON_BUTTON_MODAL_SIZE = 26

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
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col bg-modalOverlay">
      <div className="relative flex size-full items-center justify-center">
        {imageUrl === undefined ? (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-2">
            <IoInformationCircle size={28} color="red" />

            <Typography>
              {t("An error occurred while loading the image")}
            </Typography>
          </div>
        ) : (
          <ImageZoom className="size-full px-8 py-4" src={imageUrl} />
        )}
      </div>

      <div className="absolute flex size-full items-end justify-center pb-6">
        <div className="flex size-max gap-1 rounded-xl bg-modalOverlay p-1">
          {onDeleteImage !== undefined && (
            <IconButton
              size={ICON_BUTTON_MODAL_SIZE}
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
                size={ICON_BUTTON_MODAL_SIZE}
                tooltip="Resend image message"
                Icon={IoArrowRedo}
                onClick={function (): void {
                  throw new Error("Resend image message not implemented.")
                }}
              />

              <IconButton
                size={ICON_BUTTON_MODAL_SIZE}
                tooltip="Reply image message"
                Icon={IoArrowUndo}
                onClick={function (): void {
                  throw new Error("Reply message not implemented.")
                }}
              />

              <IconButton
                size={ICON_BUTTON_MODAL_SIZE}
                tooltip="Download Image"
                Icon={IoMdDownload}
                onClick={() => {
                  saveAs(imageUrl)
                }}
              />
            </div>
          )}

          <IconButton
            size={ICON_BUTTON_MODAL_SIZE}
            tooltip="Close image"
            Icon={IoCloseCircle}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageModal
