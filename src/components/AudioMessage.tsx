import {useEffect, useRef, useState, type FC} from "react"
import {IoPause, IoPlay} from "react-icons/io5"
import Typography from "./Typography"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {type ContextMenuItem} from "./ContextMenu"
import {formatTime} from "@/utils/util"
import IconButton from "./IconButton"

enum AudioState {
  Ready,
  Loading,
  Error,
}

export type AudioMessageProps = {
  audioUrl: string
  setCurrentPlaying: (value: boolean) => void
  isCurrentPlaying: boolean
  authorDisplayName: string
  timestamp: number
  id: string
  contextMenuItems: ContextMenuItem[]
  onAuthorClick: () => void
  authorAvatarUrl?: string
}

const AudioMessage: FC<AudioMessageProps> = ({
  audioUrl,
  isCurrentPlaying,
  setCurrentPlaying,
  contextMenuItems,
  onAuthorClick,
  timestamp,
  authorAvatarUrl,
  authorDisplayName,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioState, setAudioState] = useState(AudioState.Loading)
  const isError = audioState === AudioState.Error
  const isLoading = audioState === AudioState.Loading

  useEffect(() => {
    if (isCurrentPlaying || audioRef.current === null) {
      return
    }

    audioRef.current.pause()
  }, [isCurrentPlaying])

  return (
    <>
      <div className="flex size-full max-h-14 max-w-60 items-center rounded-xl border-2 border-gray-100 bg-white p-2 shadow-sm">
        {isLoading ? (
          <div className="size-6 animate-rotation rounded-full border-2 border-white border-t-gray-300" />
        ) : (
          <IconButton
            tooltip="Playback"
            isDisabled={isError || isLoading}
            Icon={isCurrentPlaying ? IoPause : IoPlay}
            onClick={() => {
              if (isCurrentPlaying) {
                audioRef.current?.pause()
                setCurrentPlaying(false)
              } else {
                void audioRef.current?.play()
                setCurrentPlaying(true)
              }
            }}
          />
        )}

        <div className="ml-auto flex items-center gap-2">
          <Typography>{formatTime(timestamp)}</Typography>

          <AvatarImage
            isRounded
            avatarType={AvatarType.Profile}
            displayName={authorDisplayName}
            avatarUrl={authorAvatarUrl}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="auto"
        src={audioUrl}
        onLoadStart={() => {
          setAudioState(AudioState.Loading)
        }}
        onCanPlayThrough={() => {
          setAudioState(AudioState.Ready)
        }}
        onError={() => {
          setAudioState(AudioState.Error)
        }}
        onEnded={() => {
          if (audioRef.current === null) {
            return
          }

          audioRef.current.currentTime = 0

          setAudioState(AudioState.Ready)
        }}
      />
    </>
  )
}

export default AudioMessage
