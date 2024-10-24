import {useEffect, useRef, useState, type FC} from "react"
import {IoAlertCircle, IoPause, IoPlay} from "react-icons/io5"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {assert, CommonAssertion, formatTime, validateUrl} from "@/utils/util"
import {useWavesurfer} from "@wavesurfer/react"
import useAudioPlayerStore from "@/hooks/util/useAudioPlayerStore"
import {type MessageBaseData, type MessageBaseProps} from "./MessageContainer"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IconButton} from "./ui/button"
import {Text} from "./ui/typography"
import {MessageContextMenu} from "./ui/context-menu"

export interface AudioMessageProps extends MessageBaseProps, AudioMessageData {}

export interface AudioMessageData extends MessageBaseData {
  audioUrl?: string
}

const AudioMessage: FC<AudioMessageProps> = ({
  audioUrl,
  contextMenuItems,
  onAuthorClick,
  timestamp,
  authorAvatarUrl,
  authorDisplayName,
  messageId,
  userId,
}) => {
  assert(messageId.length > 0, CommonAssertion.MessageIdEmpty)

  if (audioUrl !== undefined) {
    assert(validateUrl(audioUrl), "The audio url should be valid.")
  }

  const waveformRef = useRef(null)
  const [error, setError] = useState(audioUrl === undefined)
  const {audioPlayingId, setAudioPlayingId, stopPlayer} = useAudioPlayerStore()
  const {t} = useTranslation()
  const isAudioPlaying = audioPlayingId === messageId

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
    <MessageContextMenu items={contextMenuItems}>
      <div className="flex size-full max-h-14 max-w-72 items-center gap-1 rounded-xl border-2 border-gray-100 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {error ? (
          <Text className="inline-flex items-center gap-1">
            <IoAlertCircle className="text-red-500" />
            {t(LangKey.LoadError)}
          </Text>
        ) : (
          <>
            {isReady ? (
              <IconButton
                aria-label={t(LangKey.TogglePlayPause)}
                tooltip={isAudioPlaying ? t(LangKey.Pause) : t(LangKey.Play)}
                onClick={() => {
                  if (audioPlayingId === messageId) {
                    wavesurfer?.pause()

                    stopPlayer()
                  } else {
                    void wavesurfer?.play()

                    setAudioPlayingId(messageId)
                  }
                }}>
                {isAudioPlaying ? <IoPause /> : <IoPlay />}
              </IconButton>
            ) : (
              <div className="size-6 animate-rotation rounded-full border-2 border-white border-t-gray-300" />
            )}

            <div ref={waveformRef} className="max-h-12 w-full" />
          </>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <time>{formatTime(timestamp)}</time>

          <div
            role="button"
            onClick={() => {
              onAuthorClick(userId)
            }}
            aria-hidden>
            <AvatarImage
              isRounded
              avatarType={AvatarType.Profile}
              displayName={authorDisplayName}
              avatarUrl={authorAvatarUrl}
            />
          </div>
        </div>
      </div>
    </MessageContextMenu>
  )
}

export default AudioMessage
