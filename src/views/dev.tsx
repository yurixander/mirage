import {Button} from "@/components/ui/button"
import {useWavesurfer} from "@wavesurfer/react"
import {useEffect, useRef, useState, type FC} from "react"
import RecordPlugin from "wavesurfer.js/dist/plugins/record"

const DevelopmentPreview: FC = () => {
  const waveformRef = useRef(null)
  const buttonRecord = useRef<HTMLButtonElement>(null)
  const [isRecording, setIsRecording] = useState(false)

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
  })

  useEffect(() => {
    if (wavesurfer === null || buttonRecord.current === null) {
      return
    }

    const recordPlugin = wavesurfer.registerPlugin(RecordPlugin.create())

    buttonRecord.current.addEventListener("click", () => {
      if (recordPlugin.isRecording()) {
        recordPlugin.stopRecording()
        setIsRecording(false)
      } else {
        void RecordPlugin.getAvailableAudioDevices().then(devices => {
          void recordPlugin.startRecording(devices[1])
        })

        setIsRecording(true)
      }
    })
  }, [wavesurfer])

  return (
    <>
      <div className="flex flex-col">
        <div ref={waveformRef} className="max-h-12 w-full" />

        <Button ref={buttonRecord} className="w-max">
          {isRecording ? "Stop" : "Record"}
        </Button>
      </div>
    </>
  )
}

export default DevelopmentPreview
