import {IoClose, IoSend, IoStop, IoTrash} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import TruncatedTextWithTooltip from "@/components/TruncatedTextWithTooltip"
import useTooltip from "@/hooks/util/useTooltip"
import useWaveRecorder, {AudioSendError} from "@/hooks/util/useWaveRecorder"
import {Button} from "@/components/ui/button"
import {useEffect, useState, type FC} from "react"
import {motion} from "framer-motion"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

const BUTTON_SIZE_CLASS = "sm:size-5"

export enum AudioRecorderState {
  Idle,
  Recording,
  Finished,
}

type AudioRecorderProps = {
  recorderState: AudioRecorderState.Recording | AudioRecorderState.Finished
  onSendAudioMessage: (content: Blob) => Promise<void>
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
  const [isSendingAudio, setIsSendingAudio] = useState(false)
  const {t} = useTranslation()

  const {waveformRef, audioBlob, stopRecording, time, errorMsg} =
    useWaveRecorder()

  useGlobalHotkey({key: "Escape"}, () => {
    if (!isRecording) {
      stopRecording()
      onStateChange(AudioRecorderState.Idle)

      return
    }

    stopRecording()
    onStateChange(AudioRecorderState.Finished)
  })

  return (
    <motion.div className={twMerge("flex items-center gap-2", className)}>
      <Button
        className="size-7 sm:size-9"
        size="icon"
        variant="ghost"
        aria-label={
          errorMsg === null ? t(LangKey.RemoveAudio) : t(LangKey.Close)
        }
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
        <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-gray-50 p-2 dark:border-transparent dark:bg-neutral-800">
          <time
            className={twMerge(
              "text-xs text-black dark:text-gray-300 sm:text-lg",
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
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-gray-50 p-2 dark:border-transparent dark:bg-neutral-800 dark:text-gray-300">
          <TruncatedTextWithTooltip text={errorMsg} maxLength={30} />
        </div>
      )}

      {errorMsg === null && (
        <SendAndStopButton
          isSendingAudio={isSendingAudio}
          isRecording={isRecording}
          onStop={() => {
            stopRecording()
            onStateChange(AudioRecorderState.Finished)
          }}
          onSend={async () => {
            if (audioBlob === null) {
              throw new AudioSendError()
            }

            setIsSendingAudio(true)

            try {
              await onSendAudioMessage(audioBlob)
            } catch (error) {
              throw error instanceof Error ? error : new AudioSendError()
            }

            setIsSendingAudio(false)
            onStateChange(AudioRecorderState.Idle)
          }}
        />
      )}
    </motion.div>
  )
}

type SendAndStopButtonProps = {
  isSendingAudio: boolean
  isRecording: boolean
  onStop: () => void
  onSend: () => Promise<void>
  className?: string
}

const SendAndStopButton: FC<SendAndStopButtonProps> = ({
  isSendingAudio,
  isRecording,
  onSend,
  onStop,
  className,
}) => {
  const Icon = isRecording ? IoStop : IoSend
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()
  const {t} = useTranslation()

  useEffect(() => {
    const handleSendAudio = (event: KeyboardEvent): void => {
      if (event.key === "Enter") {
        event.preventDefault()

        void onSend().catch((error: Error) => {
          showTooltip(error.message, true)
        })
      }
    }

    document.addEventListener("keydown", handleSendAudio)

    return () => {
      document.removeEventListener("keydown", handleSendAudio)
    }
  }, [onSend, showTooltip])

  return (
    <Button
      ref={renderRef}
      disabled={isSendingAudio}
      size="icon"
      aria-label={
        isRecording ? t(LangKey.StopRecord) : t(LangKey.SendAudioRecorded)
      }
      className={twMerge(
        className,
        !isRecording &&
          "flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 dark:text-white"
      )}
      variant={isRecording ? "ghost" : "default"}
      onClick={() => {
        try {
          if (isRecording) {
            onStop()
          } else {
            void onSend().catch((error: Error) => {
              showTooltip(error.message, true)
            })
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
