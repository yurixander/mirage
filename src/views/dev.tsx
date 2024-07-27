import Waveform, {type AudioData} from "@/components/WaveForm"
import {useEffect, useRef, useState, type FC} from "react"

const audioData: AudioData = {
  duration: 6251,
  waveform: [
    0, 0, 1, 10, 35, 102, 301, 341, 313, 222, 261, 113, 135, 103, 87, 60, 73,
    68, 74, 74, 46, 64, 68, 63, 70, 48, 56, 77, 58, 54, 72, 61, 64, 70, 54, 75,
    62, 48, 62, 41, 83, 68, 55, 60, 65, 51, 52, 55, 66, 52, 67, 68, 55, 43, 45,
    69, 77, 50, 54, 75, 55, 57, 53, 49, 54, 58, 53, 56, 61, 54, 56, 55, 52, 89,
    56, 89, 65, 54, 53, 68, 41, 88, 70, 61, 61, 51, 52, 62, 47, 65, 66, 78, 68,
    66, 56, 69, 66, 63, 69, 61,
  ],
}

const DevelopmentPreview: FC = () => {
  // const [audioPlaying, setAudioPlaying] = useState<string>()

  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // // Simulamos el progreso con un useEffect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(prev => (prev < audioData.duration ? prev + 100 : prev))
  //   }, 100)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  const handlePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        void audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const audioElement = audioRef.current

    if (audioElement) {
      const updateProgress = (): void => {
        setProgress(audioElement.currentTime * 1000) // Convertir a milisegundos
      }

      audioElement.addEventListener("timeupdate", updateProgress)

      audioElement.addEventListener("ended", () => {
        console.log("Terminado")
      })

      audioElement.addEventListener("loadstart", () => {
        console.log("Empezo a cargar")
      })

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-bold">Audio Waveform</h1>
      <Waveform data={audioData} width={200} height={100} progress={progress} />
      <div className="mt-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <audio
          ref={audioRef}
          src="https://matrix-client.matrix.org/_matrix/media/v3/download/matrix.org/oFzwIzoxnGrRQYkqQauXhcHA"
        />
      </div>

      {/* <AudioMessage
        id="audio-1"
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        isCurrentPlaying={audioPlaying === "audio-1"}
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
        isCurrentPlaying={audioPlaying === "audio-2"}
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
      /> */}
    </div>
  )
}

export default DevelopmentPreview
