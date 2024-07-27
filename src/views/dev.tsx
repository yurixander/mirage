import AudioMessage from "@/components/AudioMessage"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [audioPlaying, setAudioPlaying] = useState<string>()

  return (
    <div className="flex flex-col gap-4">
      <AudioMessage
        id="audio-1"
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        isCurrentPlaying={"audio-1" === audioPlaying}
        authorDisplayName="John Doe"
        timestamp={Date.now()}
        contextMenuItems={[]}
        onAuthorClick={function (): void {
          throw new Error("Function not implemented.")
        }}
        setCurrentPlaying={(value: boolean) => {
          if (value) {
            setAudioPlaying("audio-1")
          } else {
            setAudioPlaying(undefined)
          }
        }}
      />

      <AudioMessage
        id="audio-2"
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        isCurrentPlaying={"audio-2" === audioPlaying}
        authorDisplayName="John Doe"
        timestamp={Date.now()}
        contextMenuItems={[]}
        onAuthorClick={function (): void {
          throw new Error("Function not implemented.")
        }}
        setCurrentPlaying={(value: boolean) => {
          if (value) {
            setAudioPlaying("audio-2")
          } else {
            setAudioPlaying(undefined)
          }
        }}
      />
    </div>
  )
}

export default DevelopmentPreview
