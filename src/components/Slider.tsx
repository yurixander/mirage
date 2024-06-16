import React, {useState, type FC} from "react"

export type SliderProps = {
  min: number
  max: number
  step?: number
  value: number
  onProgressChange: (value: number) => void
}

const Slider: FC<SliderProps> = ({onProgressChange, min, max, step, value}) => {
  const [progress, setProgress] = useState(value)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    setProgress(value)
    onProgressChange(value)
  }

  return (
    <label className="relative flex w-60 items-center justify-center">
      <div className="-ml-4 mb-14 flex w-60">
        <div
          style={{
            left: `${progress * (240 / max) - ((progress * 100) / max / 100) * 15}px`,
          }}
          className="absolute flex flex-col items-center justify-center">
          <div className="size-4 rotate-45 bg-fuchsia-600" />
          <div className="absolute mb-4 flex h-5 w-10 items-center justify-center rounded bg-fuchsia-600 text-white">
            {progress}%
          </div>
        </div>
      </div>
      {step === undefined || step < 10 ? (
        <BasicProgressBar progress={(progress * 100) / (max - min)} />
      ) : (
        <StepProgressBar steps={(max - min) / step} />
      )}

      <input
        max={max}
        min={min}
        step={step}
        value={progress}
        onInput={handleOnInput}
        className="absolute h-3 w-60 cursor-pointer appearance-none rounded-full bg-transparent p-0"
        type="range"
      />
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
        <div className="size-2 rounded-full bg-white shadow" />
      </div>
      {Array.from({length: steps}, (_, i) => (
        <Step key={i} />
      ))}
    </div>
  )
}

const Step: FC = () => {
  return (
    <>
      <div className="w-full" />

      <div>
        <div className="size-2 rounded-full bg-white shadow" />
      </div>
    </>
  )
}

export default Slider
