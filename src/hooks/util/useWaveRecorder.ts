import {useWavesurfer} from "@wavesurfer/react"
import {useEffect, useRef, useState} from "react"
import type WaveSurfer from "wavesurfer.js"
import RecordPlugin from "wavesurfer.js/dist/plugins/record"

class RecordUnavailableError extends Error {
  name: string = "Record Unavailable"
  message: string = "The recorder is not available"
}

export class AudioSendError extends Error {
  name: string = "Audio Send Error"
  message: string = "Failed to send audio"
}

type UseWaveRecorderReturnType = {
  errorMsg: string | null
  time: string
  waveformRef: React.MutableRefObject<null>
  audioBlob: Blob | null
  stopRecording: () => void
  pauseRecording: () => void
}

const useWaveRecorder = (): UseWaveRecorderReturnType => {
  const waveformRef = useRef(null)
  const [record, setRecord] = useState<RecordPlugin | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [time, setTime] = useState("")

  const {wavesurfer} = useWavesurfer({
    container: waveformRef,
    waveColor: "#4a90e2",
    progressColor: "#4a90e2",
    cursorColor: "#4a90e2",
    barWidth: 3,
    barGap: 4,
    barRadius: 20,
    cursorWidth: 0,
    height: 28,
    fillParent: true,
  })

  useEffect(() => {
    if (record === null) {
      return
    }

    record.on("record-data-available", blob => {
      setAudioBlob(blob)
    })

    record.on("record-progress", time => {
      const minutes = Math.floor((time % 3_600_000) / 60_000)
      const seconds = Math.floor((time % 60_000) / 1000)

      const formattedTime = [minutes, seconds]
        .map(v => (v < 10 ? "0" + v : v))
        .join(":")

      setTime(formattedTime)
    })

    return () => {
      record.destroy()
    }
  }, [record])

  useEffect(() => {
    if (record !== null || wavesurfer === null) {
      return
    }

    const newRecord = wavesurfer.registerPlugin(RecordPlugin.create())

    setRecord(newRecord)

    void startRecording(newRecord, wavesurfer)
      .then(() => {
        setErrorMsg(null)
      })
      .catch((error: Error) => {
        setErrorMsg(error.message)
      })
  }, [record, wavesurfer])

  const stopRecording = (): void => {
    if (record === null || wavesurfer === null) {
      throw new RecordUnavailableError()
    }

    if (!record.isRecording()) {
      return
    }

    try {
      record.stopRecording()
    } catch {
      wavesurfer.destroy()
      record.destroy()

      setRecord(null)
    }
  }

  const pauseRecording = (): void => {
    if (record === null || wavesurfer === null) {
      throw new RecordUnavailableError()
    }

    if (!record.isRecording() || !record.isPaused()) {
      return
    }

    try {
      record.pauseRecording()
    } catch {
      throw new Error("Could not pause recording")
    }
  }

  return {
    errorMsg,
    time,
    waveformRef,
    audioBlob,
    pauseRecording,
    stopRecording,
  }
}

const startRecording = async (
  record: RecordPlugin,
  wavesurfer: WaveSurfer
): Promise<boolean> => {
  if (record === null || wavesurfer === null) {
    throw new RecordUnavailableError()
  }

  if (record.isRecording()) {
    throw new Error("Recording is active")
  }

  const availableDevices = await RecordPlugin.getAvailableAudioDevices()

  if (availableDevices.length === 0) {
    throw new Error("You don't have audio devices")
  }

  await record.startRecording(availableDevices[0])
  return true
}

export default useWaveRecorder
