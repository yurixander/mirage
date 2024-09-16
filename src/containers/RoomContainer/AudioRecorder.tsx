import {IoClose, IoSend, IoStop, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import TruncatedTextWithTooltip from "@/components/TruncatedTextWithTooltip"
import useTooltip from "@/hooks/util/useTooltip"
import useWaveRecorder from "@/hooks/util/useWaveRecorder"
import {Button} from "@/components/ui/button"
import {useEffect, type FC} from "react"
import {motion} from "framer-motion"

const BUTTON_SIZE_CLASS = "sm:size-5"

export enum AudioRecorderState {
  Idle,
  Recording,
  Finished,
}

type AudioRecorderProps = {
  recorderState: AudioRecorderState.Recording | AudioRecorderState.Finished
  onSendAudioMessage: (content: Blob) => void
  onStateChange: (newState: AudioRecorderState) => void
  className?: string
}

const AudioRecorder: FC<AudioRecorderProps> = ({
  recorderState,
  onStateChange,
  onSendAudioMessage,
  className,
}) => {
  const isRecording = recorderState === AudioRecorderState.Recording

  const {waveformRef, audioBlob, stopRecording, time, errorMsg} =
    useWaveRecorder()

  return (
    <motion.div className={twMerge("flex items-center gap-2", className)}>
      <Button
        aria-label={errorMsg === null ? "Remove audio" : "Close"}
        className="size-7 sm:size-9"
        size="icon"
        variant="ghost"
        onClick={() => {
          stopRecording()
          onStateChange(AudioRecorderState.Idle)
        }}>
        {errorMsg === null ? (
          <IoTrash aria-hidden className={BUTTON_SIZE_CLASS} />
        ) : (
          <IoClose aria-hidden className={BUTTON_SIZE_CLASS} />
        )}
      </Button>

      {errorMsg === null ? (
        <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-gray-50 p-2">
          <time
            className={twMerge(
              "text-xs text-black sm:text-lg",
              isRecording && "animate-pulse"
            )}>
            {time}
          </time>

          <div
            aria-hidden
            ref={waveformRef}
            className={twMerge(
              "max-h-6 w-28 grow py-1 sm:max-h-8 sm:w-40",
              isRecording && "animate-pulse"
            )}
          />
        </div>
      ) : (
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-gray-50 p-2">
          <TruncatedTextWithTooltip text={errorMsg} maxLength={30} />
        </div>
      )}

      {errorMsg === null && (
        <SendAndStopButton
          isRecording={isRecording}
          onStop={() => {
            stopRecording()
            onStateChange(AudioRecorderState.Finished)
          }}
          onSend={() => {
            if (audioBlob === null) {
              throw new Error("Failed to send audio.")
            }

            onSendAudioMessage(audioBlob)
            onStateChange(AudioRecorderState.Idle)
          }}
        />
      )}
    </motion.div>
  )
}

type SendAndStopButtonProps = {
  isRecording: boolean
  onStop: () => void
  onSend: () => void
  className?: string
}

const SendAndStopButton: FC<SendAndStopButtonProps> = ({
  isRecording,
  onSend,
  onStop,
  className,
}) => {
  const Icon = isRecording ? IoStop : IoSend
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  useEffect(() => {
    const handleSendAudio = (event: KeyboardEvent): void => {
      if (event.key === "Enter") {
        event.preventDefault()

        onSend()
      }
    }

    document.addEventListener("keydown", handleSendAudio)

    return () => {
      document.removeEventListener("keydown", handleSendAudio)
    }
  }, [onSend])

  return (
    <Button
      ref={renderRef}
      aria-label={isRecording ? "Stop record" : "Send audio recorded"}
      size="icon"
      className={twMerge(
        className,
        !isRecording &&
          "flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
      )}
      variant={isRecording ? "ghost" : "default"}
      onClick={() => {
        try {
          if (isRecording) {
            onStop()
          } else {
            onSend()
          }
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showTooltip(error.message, true)
        }
      }}>
      <Icon aria-hidden className={BUTTON_SIZE_CLASS} />
    </Button>
  )
}

export default AudioRecorder
