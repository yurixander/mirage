import React, {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type SliderProps = {
  min: number
  max: number
  value: number
  step?: number
  isTooltip?: boolean
  onProgressChange: (value: number) => void
}

const Slider: FC<SliderProps> = ({onProgressChange, min, max, value, step}) => {
  const [progress, setProgress] = useState(value)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    setProgress(value)
    onProgressChange(value)
  }

  return (
    <label className="flex w-60 flex-col items-center justify-center">
      <input
        max={max}
        min={min}
        step={step}
        value={progress}
        onInput={handleOnInput}
        className="relative z-10 h-3 w-60 cursor-pointer appearance-none rounded-full bg-transparent p-0"
        type="range"
      />

      {step === undefined || step < 10 ? (
        <BasicProgressBar progress={(progress * 100) / (max - min)} />
      ) : (
        <StepProgressBar steps={(max - min) / step} />
      )}
    </label>
  )
}

const BasicProgressBar: FC<{progress: number}> = ({progress}) => {
  return (
    <div className="absolute h-3 w-56 overflow-hidden rounded-full bg-slate-100 shadow">
      <div
        style={{width: `${progress}%`}}
        className="h-3 bg-fuchsia-500 shadow"
      />
    </div>
  )
}

const StepProgressBar: FC<{steps: number}> = ({steps}) => {
  return (
    <div className="absolute flex h-3 w-60 items-center overflow-hidden rounded-full bg-slate-200 shadow">
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
