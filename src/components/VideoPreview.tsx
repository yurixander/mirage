import {IoAdd, IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import Typography, {TypographyVariant} from "./Typography"
import {useRef, useState, type FC} from "react"

const VideoPreview: FC = () => {
  const [url, setUrl] = useState("")

  const handleFileSelected = (e: {
    target: {files: Array<Blob | MediaSource>}
  }): void => {
    const fileURL = URL.createObjectURL(e.target.files[0])
    setUrl(fileURL)
  }

  const videoRef = useRef(null)
  const imageRef = useRef(null)

  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex w-full items-start rounded-t border-b-2 border-b-slate-200 bg-slate-100 p-5">
        <Typography className="w-full" variant={TypographyVariant.Heading}>
          Video
        </Typography>
        <IoCloseCircle size={20} />
      </div>
      <div className="flex h-full flex-col">
        <div className="flex size-full items-center justify-center p-2">
          <video
            className="size-full max-h-60 rounded bg-black"
            src={url}
            controls
            ref={videoRef}
            onLoadedData={e => {
              getThumbnail(videoRef.current, imageRef.current)
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 p-2">
          <div className="flex size-14 items-center justify-center rounded bg-slate-100 shadow hover:bg-slate-300">
            <img
              alt="frame"
              className="size-full rounded bg-black object-contain shadow"
              ref={imageRef}
            />
          </div>

          <IoAdd
            role="button"
            className="flex size-14 items-center justify-center rounded border-2 border-slate-300 bg-slate-100 text-slate-300 shadow"
            onClick={() => {
              pikerVideo(handleFileSelected)
            }}
          />
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
  image: HTMLImageElement | null
): void => {
  if (video === null) {
    return
  }
  if (image === null) {
    return
  }

  const virtualVideo = document.createElement("video")
  virtualVideo.src = video.src
  const obtain = (): void => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context?.drawImage(virtualVideo, 0, 0, canvas.width, canvas.height)
    image.src = canvas.toDataURL()
  }

  virtualVideo.currentTime = 1
  virtualVideo.addEventListener("seeked", obtain)
  virtualVideo.remove()
}

const pikerVideo = (
  handleFileSelected: (e: {target: {files: Array<Blob | MediaSource>}}) => void
): void => {
  const inputFile = document.createElement("input")
  inputFile.type = "file"
  inputFile.accept = "video/*"
  inputFile.addEventListener("change", handleFileSelected)
  inputFile.click()
}

export default VideoPreview
