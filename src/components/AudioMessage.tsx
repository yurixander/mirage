import {useEffect, useRef, useState, type FC} from "react"
import {IoAlertCircle, IoPause, IoPlay} from "react-icons/io5"
import Typography from "./Typography"
import AvatarImage, {AvatarType} from "./AvatarImage"
import ContextMenu, {type ContextMenuItem} from "./ContextMenu"
import {assert, CommonAssertion, formatTime, validateUrl} from "@/utils/util"
import IconButton from "./IconButton"
import {useWavesurfer} from "@wavesurfer/react"
import useAudioPlayerStore from "@/hooks/util/useAudioPlayerStore"

export type AudioMessageProps = {
  audioUrl?: string
  authorDisplayName: string
  timestamp: number
  messageId: string
  contextMenuItems: ContextMenuItem[]
  onAuthorClick: () => void
  authorAvatarUrl?: string
}

export type AudioMessageData = {
  audioUrl?: string
  authorDisplayName: string
  timestamp: number
  messageId: string
  authorAvatarUrl?: string
}

const AudioMessage: FC<AudioMessageProps> = ({
  audioUrl,
  contextMenuItems,
  onAuthorClick,
  timestamp,
  authorAvatarUrl,
  authorDisplayName,
  messageId,
}) => {
  if (authorAvatarUrl !== undefined) {
    assert(validateUrl(authorAvatarUrl), CommonAssertion.AvatarUrlNotValid)
  }

  if (audioUrl !== undefined) {
    assert(validateUrl(audioUrl), "The audio url should be valid.")
  }

  const waveformRef = useRef(null)
  const [error, setError] = useState(audioUrl === undefined)
  const {audioPlayingId, setAudioPlayingId, stopPlayer} = useAudioPlayerStore()

  const {wavesurfer, isReady} = useWavesurfer({
    container: waveformRef,
    waveColor: "#ddd",
    progressColor: "#4a90e2",
    cursorColor: "#4a90e2",
    barWidth: 3,
    barGap: 4,
    barRadius: 20,
    cursorWidth: 0,
    height: 40,
    url: audioUrl,
  })

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!isReady) setError(true)
    }, 40_000)

    return () => {
      clearTimeout(loadTimeout)
    }
  }, [isReady])

  useEffect(() => {
    if (wavesurfer === null) {
      return
    }

    if (audioPlayingId !== messageId) {
      wavesurfer.pause()
    }
  }, [audioPlayingId, messageId, wavesurfer])

  useEffect(() => {
    if (wavesurfer === null) {
      return
    }

    wavesurfer.on("ready", () => {
      setError(false)
    })

    wavesurfer.on("finish", () => {
      stopPlayer()

      wavesurfer.setTime(0)
    })

    wavesurfer.on("error", () => {
      setError(true)
    })

    return () => {
      wavesurfer.unAll()
    }
  }, [isReady, stopPlayer, wavesurfer])

  return (
    <>
      <ContextMenu
        id={`audio-menu-${messageId}`}
        elements={contextMenuItems}
        className="cursor-default">
        <div className="flex size-full max-h-14 max-w-72 items-center gap-1 rounded-xl border-2 border-gray-100 bg-white p-2 shadow-sm">
          {error ? (
            <Typography className="inline-flex items-center gap-1">
              <IoAlertCircle className="text-red-500" /> Load error
            </Typography>
          ) : (
            <>
              {isReady ? (
                <IconButton
                  tooltip="Playback"
                  Icon={audioPlayingId === messageId ? IoPause : IoPlay}
                  onClick={() => {
                    if (audioPlayingId === messageId) {
                      wavesurfer?.pause()

                      stopPlayer()
                    } else {
                      void wavesurfer?.play()

                      setAudioPlayingId(messageId)
                    }
                  }}
                />
              ) : (
                <div className="size-6 animate-rotation rounded-full border-2 border-white border-t-gray-300" />
              )}

              <div ref={waveformRef} className="max-h-12 w-full" />
            </>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Typography>{formatTime(timestamp)}</Typography>

            <div role="button" onClick={onAuthorClick} aria-hidden>
              <AvatarImage
                isRounded
                avatarType={AvatarType.Profile}
                displayName={authorDisplayName}
                avatarUrl={authorAvatarUrl}
              />
            </div>
          </div>
        </div>
      </ContextMenu>
    </>
  )
}

export default AudioMessage
