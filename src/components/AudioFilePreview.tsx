import {useRef, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoCloseCircle, IoPause, IoPlay} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import {fileSizeToString, getFileExtension} from "./FileMessage"
import {ReactSVG} from "react-svg"
import {StaticAssetPath} from "@/utils/util"
import {useWavesurfer} from "@wavesurfer/react"
import IconButton from "./IconButton"

export type AudioFilePreviewProps = {
  fileName: string
  fileSize: number
  audioUrl: string
  onClose: () => void
  onSend: () => void
}

const AudioFilePreview: FC<AudioFilePreviewProps> = ({
  fileName,
  fileSize,
  audioUrl,
  onClose,
  onSend,
}) => {
  const fileExtension = getFileExtension(fileName).toUpperCase()

  const waveformRef = useRef(null)

  const {wavesurfer: waverer, isReady} = useWavesurfer({
    container: waveformRef,
    waveColor: "#ddd",
    progressColor: "#4a90e2",
    cursorColor: "#4a90e2",
    barWidth: 2,
    barGap: 2,
    barRadius: 20,
    cursorWidth: 0,
    height: 40,
    url: audioUrl,
  })

  return (
    <div className="flex w-messageMaxWidth flex-col rounded border bg-slate-50 shadow-lg">
      <div className="flex h-16 w-full items-center rounded-t border-b bg-slate-100 px-5">
        <Typography
          variant={TypographyVariant.HeadingMedium}
          className="w-full">
          Upload Audio
        </Typography>

        <IoCloseCircle size={20} color="gray" role="button" onClick={onClose} />
      </div>

      <div className="flex size-full flex-col gap-3 p-4">
        <div className="flex w-full flex-col items-center gap-2 rounded border bg-white p-2">
          <div className="flex w-full">
            <Typography
              className="line-clamp-1 font-light text-slate-700"
              variant={TypographyVariant.Body}>
              {fileName}
            </Typography>
          </div>

          <div className="flex w-full items-center gap-2 rounded bg-slate-100 p-2 shadow">
            <div>
              {isReady ? (
                <IconButton
                  tooltip="Toggle Play Pause"
                  Icon={waverer?.isPlaying() ? IoPause : IoPlay}
                  className="flex size-10 items-center justify-center rounded-full bg-white p-2 shadow"
                  onClick={() => {
                    if (waverer === null) {
                      return
                    }

                    if (waverer.isPlaying()) {
                      waverer.pause()
                    } else {
                      void waverer.play()
                    }
                  }}
                />
              ) : (
                <div className="size-6 animate-rotation rounded-full border-2 border-white border-t-gray-300" />
              )}
            </div>

            <div ref={waveformRef} className="max-h-12 w-full" />
          </div>

          <div className="flex w-full">
            <Typography
              className="w-full font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {fileExtension}
            </Typography>

            <Typography
              className="min-w-20 text-right font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {fileSizeToString(fileSize)}
            </Typography>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden">
          <ReactSVG src={StaticAssetPath.DotGrid} />

          <ReactSVG src={StaticAssetPath.DotGrid} />
        </div>
      </div>

      <div className="flex h-16 w-full items-center justify-end gap-2 border-t bg-slate-100 px-5">
        <Button className="w-20" label="Cancel" onClick={onClose} />

        <Button
          className="w-20"
          variant={ButtonVariant.Primary}
          label="Send"
          onClick={onSend}
        />
      </div>
    </div>
  )
}

export const getAudioDuration = (
  file: File,
  onObtainDuration: (duration: number) => void
): void => {
  const media = document.createElement("audio")
  media.src = URL.createObjectURL(file)

  const obtainDuration = (event: Event): void => {
    if (event.target instanceof HTMLAudioElement) {
      onObtainDuration(event.target.duration)
      clear()
    }
  }

  const clear = (): void => {
    URL.revokeObjectURL(media.src)

    media.removeEventListener("loadeddata", obtainDuration)
  }

  media.addEventListener("loadeddata", obtainDuration)
}
export default AudioFilePreview
