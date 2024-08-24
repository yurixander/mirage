import {IoAdd, IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import Typography, {TypographyVariant} from "./Typography"
import {type FC} from "react"

export type VideoPreviewProps = {
  videoSrc: string
  onSend: (src: string) => void
  onClose: () => void
  onCancel: () => void
  file?: File
}

const VideoPreview: FC<VideoPreviewProps> = ({
  videoSrc,
  onCancel,
  onClose,
  onSend,
  file,
}) => {
  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex w-full items-start rounded-t border-b-2 border-b-slate-200 bg-slate-100 p-5">
        <Typography className="w-full" variant={TypographyVariant.Heading}>
          Upload Video
        </Typography>
        <IoCloseCircle size={20} role="button" onClick={onClose} />
      </div>

      <div className="flex h-full flex-col">
        <div className="flex size-full items-center justify-center p-2">
          <video
            className="size-full max-h-60 rounded bg-black"
            src={file === undefined ? videoSrc : URL.createObjectURL(file)}
            controls
          />
        </div>

        <div className="hidden items-center justify-center gap-2 p-2">
          <div className="flex size-14 items-center justify-center rounded bg-slate-100 shadow hover:bg-slate-300">
            <img
              alt="frame"
              className="size-full rounded bg-black object-contain shadow"
            />
          </div>

          <IoAdd className="flex size-14 items-center justify-center rounded border-2 border-slate-300 bg-slate-100 text-slate-300 shadow" />
        </div>
      </div>
      <div className="flex justify-end gap-3 rounded-b border-t-2 border-t-slate-200 bg-slate-100 p-3">
        <Button
          className="w-20"
          label="Cancel"
          variant={ButtonVariant.Secondary}
          onClick={onCancel}
        />

        <Button
          className="w-20"
          label="Send"
          variant={ButtonVariant.Primary}
          onClick={() => {
            onSend(videoSrc)
          }}
        />
      </div>
    </div>
  )
}

export default VideoPreview
