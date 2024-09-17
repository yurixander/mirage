import {Button} from "@/components/ui/button"
import AudioRecorder, {
  AudioRecorderState,
} from "@/containers/RoomContainer/AudioRecorder"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [state, setState] = useState(AudioRecorderState.Idle)

  return (
    <>
      <Button
        onClick={() => {
          setState(AudioRecorderState.Recording)
        }}>
        Record
      </Button>

      {state !== AudioRecorderState.Idle && (
        <AudioRecorder
          recorderState={state}
          onSendAudioMessage={async function (content: Blob): Promise<void> {
            throw new Error("Function not implemented.")
          }}
          onStateChange={setState}
        />
      )}
    </>
  )
}

export default DevelopmentPreview
