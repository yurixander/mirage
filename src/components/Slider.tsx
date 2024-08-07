import React, {useRef, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type SliderProps = {
  min: number
  max: number
  value: number
  step?: number
  width?: number
  onProgressChange: (value: number) => void
}

const Slider: FC<SliderProps> = ({
  onProgressChange,
  min,
  max,
  value,
  step,
  width,
}) => {
  const [progress, setProgress] = useState(value)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(event.target.value)

    setProgress(value)
    onProgressChange(value)
  }

  const labelRef = useRef<HTMLLabelElement>(null)
  const labelWidth = labelRef.current?.clientWidth

  return (
    <label
      style={{width: width ?? "100%"}}
      className="flex flex-col items-center justify-center"
      ref={labelRef}>
      {step === undefined || step < 10 ? (
        <BasicProgressBar
          barWidth={width ?? labelWidth ?? -1}
          progress={(progress * 100) / (max - min)}
        />
      ) : (
        <StepProgressBar barWidth={width} steps={(max - min) / step} />
      )}
      <input
        style={{width: width ?? "100%"}}
        max={max}
        min={min}
        step={step}
        value={progress}
        onInput={handleOnInput}
        className="relative h-3 cursor-pointer appearance-none rounded-full bg-transparent p-0"
        type="range"
      />
    </label>
  )
}

type BasicProgressBarProps = {
  progress: number
  barWidth: number
}

const BasicProgressBar: FC<BasicProgressBarProps> = ({progress, barWidth}) => {
  return (
    <div
      style={{width: `${barWidth === -1 ? 100 : 100 - (10 * 100) / barWidth}%`}}
      className="relative -mb-3 h-3 overflow-hidden rounded-full bg-slate-100 shadow">
      <div
        style={{width: `${progress}%`}}
        className="h-3 bg-fuchsia-500 shadow"
      />
    </div>
  )
}

const StepProgressBar: FC<{steps: number; barWidth?: number}> = ({
  steps,
  barWidth,
}) => {
  return (
    <div
      style={{width: barWidth ?? "100%"}}
      className="relative -mb-3 flex h-3 items-center overflow-hidden rounded-full bg-slate-200 shadow">
      <div className="rounded-full bg-slate-300 text-end">
        <div className="size-2 rounded-full bg-slate-200" />
      </div>
      {Array.from({length: steps}, (_, i) => (
        <Step isEnd={i === steps - 1} key={i} />
      ))}
    </div>
  )
}

const Step: FC<{isEnd: boolean}> = ({isEnd}) => {
  return (
    <>
      <div className="w-full" />

      <div>
        <div
          className={twMerge(
            "size-2 rounded-full",
            isEnd ? "bg-slate-200" : "bg-white"
          )}
        />
      </div>
    </>
  )
}

export default Slider
