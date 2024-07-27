import React from "react"

export type AudioData = {
  duration: number
  waveform: number[]
}

type WaveformProps = {
  data: AudioData
  width: number
  height: number
  progress: number
}

const Waveform: React.FC<WaveformProps> = ({data, width, height, progress}) => {
  const {waveform} = data
  const maxValue = Math.max(...waveform)
  const progressIndex = Math.floor((progress / data.duration) * waveform.length)

  return (
    <svg
      aria-label="Wave form"
      width={width}
      height={height}
      className="bg-gray-200">
      {waveform.map((value, index) => (
        <line
          key={index}
          x1={(index / waveform.length) * width}
          y1={height / 2}
          x2={(index / waveform.length) * width}
          y2={height / 2 - (value / maxValue) * (height / 2)}
          stroke={index < progressIndex ? "blue" : "black"}
        />
      ))}
    </svg>
  )
}

export default Waveform
