import {Button} from "@/components/ui/button"
import AudioRecorder, {
  AudioRecorderState,
} from "@/containers/RoomContainer/AudioRecorder"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [state, setState] = useState(AudioRecorderState.Idle)

  return (
    <>
      <div className="m-3 flex flex-col">
        {state === AudioRecorderState.Idle ? (
          <Button
            className="w-max"
            onClick={() => {
              setState(AudioRecorderState.Recording)
            }}>
            Record Audio
          </Button>
        ) : (
          <AudioRecorder
            recorderState={state}
            onStateChange={setState}
            onSendAudioMessage={function (content: Blob): void {
              throw new Error("Function not implemented.")
            }}
          />
        )}
      </div>
    </>
  )
}

export default DevelopmentPreview
