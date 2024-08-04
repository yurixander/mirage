import AudioMessage from "@/components/AudioMessage"
import {buildMessageMenuItems} from "@/utils/menu"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <AudioMessage
        id="audio-1"
        audioUrl="https://matrix-client.matrix.org/_matrix/media/v3/download/matrix.org/oFzwIzoxnGrRQYkqQauXhcHA"
        isCurrentPlaying={audioPlaying === "audio-1"}
        authorDisplayName="John Doe"
        timestamp={Date.now()}
        contextMenuItems={buildMessageMenuItems({
          canDeleteMessage: true,
          onDeleteMessage() {},
          onReplyMessage() {},
          onResendMessage() {},
        })}
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
        isCurrentPlaying={audioPlaying === "audio-2"}
        authorDisplayName="John Doe"
        timestamp={Date.now()}
        contextMenuItems={buildMessageMenuItems({
          canDeleteMessage: true,
          onDeleteMessage() {},
          onReplyMessage() {},
          onResendMessage() {},
        })}
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
