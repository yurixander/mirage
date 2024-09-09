import {IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import Typography, {TypographyVariant} from "./Typography"
import {type FC} from "react"
import {useTranslation} from "react-i18next"

export type VideoPreviewProps = {
  videoSrc: string
  onSend: () => void
  onClose: () => void
  onCancel: () => void
}

const VideoPreview: FC<VideoPreviewProps> = ({
  videoSrc,
  onCancel,
  onClose,
  onSend,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex w-full items-start rounded-t border-b-2 border-b-slate-200 bg-slate-100 p-5">
        <Typography className="w-full" variant={TypographyVariant.Heading}>
          {t("Upload Video")}
        </Typography>

        <IoCloseCircle size={20} role="button" onClick={onClose} />
      </div>

      <div className="flex h-full flex-col">
        <div className="flex size-full items-center justify-center p-2">
          <video
            className="size-full max-h-60 rounded bg-black"
            src={videoSrc}
            controls
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 rounded-b border-t-2 border-t-slate-200 bg-slate-100 p-3">
        <Button
          className="w-20"
          label={t("Cancel")}
          variant={ButtonVariant.Secondary}
          onClick={onCancel}
        />

        <Button
          className="w-20"
          label={t("Send")}
          variant={ButtonVariant.Primary}
          onClick={onSend}
        />
      </div>
    </div>
  )
}

export default VideoPreview
