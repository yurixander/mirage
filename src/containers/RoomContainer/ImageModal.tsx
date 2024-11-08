import {type FC} from "react"
import {saveAs} from "file-saver"
import {IoMdDownload, IoMdTrash} from "react-icons/io"
import {
  IoArrowRedo,
  IoArrowUndo,
  IoCloseCircle,
  IoInformationCircle,
} from "react-icons/io5"
import Typography from "@/components/Typography"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IconButton} from "@/components/ui/button"

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

            <Typography>{t(LangKey.LoadingImageError)}</Typography>
          </div>
        ) : (
          <img
            className="size-full px-8 py-4"
            src={imageUrl}
            alt={`Img ${imageUrl} from message`}
          />
        )}
      </div>

      <div className="absolute flex size-full items-end justify-center pb-6">
        <div className="flex size-max gap-1 rounded-xl bg-modalOverlay p-1">
          {onDeleteImage !== undefined && (
            <IconButton
              tooltip={t(LangKey.Delete)}
              onClick={() => {
                onDeleteImage()
                onClose()
              }}>
              <IoMdTrash size={ICON_BUTTON_MODAL_SIZE} />
            </IconButton>
          )}

          {imageUrl !== undefined && (
            <div>
              <IconButton
                tooltip={t(LangKey.Resend)}
                onClick={() => {
                  throw new Error("Resend image message not implemented.")
                }}>
                <IoArrowRedo size={ICON_BUTTON_MODAL_SIZE} />
              </IconButton>

              <IconButton
                tooltip={t(LangKey.Reply)}
                onClick={() => {
                  throw new Error("Reply message not implemented.")
                }}>
                <IoArrowUndo size={ICON_BUTTON_MODAL_SIZE} />
              </IconButton>

              <IconButton
                tooltip={t(LangKey.DownloadImage)}
                onClick={() => {
                  saveAs(imageUrl)
                }}>
                <IoMdDownload size={ICON_BUTTON_MODAL_SIZE} />
              </IconButton>
            </div>
          )}

          <IconButton tooltip={t(LangKey.CloseModal)} onClick={onClose}>
            <IoCloseCircle size={ICON_BUTTON_MODAL_SIZE} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
