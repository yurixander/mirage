import {IoAdd, IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import IconButton from "./IconButton"
import Typography, {TypographyVariant} from "./Typography"
import {useRef, useState, type FC} from "react"

const VideoPreview: FC = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex w-full rounded-t border-b-2 border-b-slate-200 bg-slate-100 p-5">
        <Typography className="w-full" variant={TypographyVariant.Heading}>
          Video
        </Typography>
        <IconButton tooltip="Exit" onClick={() => {}} Icon={IoCloseCircle} />
      </div>
      <div className="flex h-full flex-col">
        <div className="flex size-full items-center justify-center p-2">
          <video
            className="w-full rounded bg-green-500"
            src="http://localhost/apps/imagenes/vid.mp4"
            controls
            ref={videoRef}
          />
        </div>
        <div className="flex items-center justify-center gap-2 p-2">
          <button
            onClick={() => {
              getThumbnail(
                videoRef.current,
                canvasRef.current,
                imageRef.current
              )
            }}
            className="flex size-12 items-center justify-center rounded border-2 border-slate-400 bg-slate-200 p-1">
            <canvas className="size-12" ref={canvasRef}></canvas>
            <img
              alt="frame"
              className="size-full rounded shadow"
              ref={imageRef}
            />
          </button>
          <button className="flex size-12 items-center justify-center rounded border-2 border-slate-400 bg-slate-200">
            <IoAdd size={40} className="text-slate-400" />
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3 rounded-b border-t-2 border-t-slate-200 bg-slate-100 p-3">
        <Button
          className="w-20"
          label="Cancel"
          variant={ButtonVariant.Secondary}
          onClick={() => {}}
        />
        <Button
          className="w-20"
          label="Send"
          variant={ButtonVariant.Primary}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

const getThumbnail = (
  video: HTMLVideoElement | null,
  canvas: HTMLCanvasElement | null,
  image: HTMLImageElement | null
): void => {
  if (canvas === null) {
    return
  }
  if (video === null) {
    return
  }
  if (image === null) {
    return
  }

  const context = canvas.getContext("2d")
  context?.drawImage(video, 0, 0, canvas.width, canvas.height)
  image.src = canvas.toDataURL()
  canvas.style.display = "none"
}

export default VideoPreview
