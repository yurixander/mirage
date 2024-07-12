import React, {useState, type FC} from "react"

export type SliderProps = {
  min: number
  max: number
  step?: number
  value: number
  onProgressChange: (value: number) => void
}

const Slider: FC<SliderProps> = ({onProgressChange, min, max, step, value}) => {
  const [internalValue, setInternalValue] = useState(value)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(event.target.value)

    setInternalValue(value)
    onProgressChange(value)
  }

  return (
    <label className="flex flex-col gap-1">
      {step === undefined || step < 10 ? (
        <BasicProgressBar progress={(internalValue * 100) / max ?? "50"} />
      ) : (
        <StepProgressBar steps={(max - min) / (step ?? 1)} />
      )}

      <input
        max={max ?? 100}
        min={min ?? 0}
        step={step ?? 1}
        value={internalValue}
        onInput={handleOnInput}
        className="slider relative -top-4 h-3 w-60 cursor-pointer appearance-none rounded-full bg-transparent p-0"
        type="range"
      />
    </label>
  )
}

const BasicProgressBar: FC<{progress: number}> = ({progress}) => {
  return (
    <div className="h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div
        style={{width: `${progress}%`}}
        className="h-3 bg-purple-500 shadow"
      />
    </div>
  )
}

const StepProgressBar: FC<{steps: number}> = ({steps}) => {
  const step = []

  for (let i = 0; i < steps; i++) {
    step.push(i)
  }

  return (
    <div className="flex h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div className="rounded-full bg-slate-300 text-end">
        <div className="size-3 rounded-full bg-white shadow" />
      </div>

      {step.map((_opt, index) => (
        <Step key={index} />
      ))}
    </div>
  )
}

const Step: FC = () => {
  return (
    <>
      <div className="w-full" />

      <div>
        <div className="size-3 rounded-full bg-white shadow" />
      </div>
    </>
  )
}

export default Slider
