import React, {useState, type FC} from "react"

export type SliderProps = {
  min: number
  max: number
  step?: number
  initialValue: number
  onProgressChange: (value: string) => void
}

const Slider: FC<SliderProps> = ({
  onProgressChange,
  min,
  max,
  step,
  initialValue,
}) => {
  const [progress, setProgress] = useState((initialValue * 100) / (max ?? 100))
  const [internalValue, setInternalValue] = useState(initialValue)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setProgress((Number(value) * 100) / (max ?? 100))
    setInternalValue(Number(value))
    onProgressChange(value)
  }

  return (
    <label className="flex flex-col gap-1">
      {step === undefined || step < 10 ? (
        <BasicProgressBar progress={String(progress) ?? "50"} />
      ) : (
        <StepProgressBar steps={(max - min) / (step ?? 1)} />
      )}

      <input
        max={max ?? 100}
        min={min ?? 0}
        step={step ?? 1}
        value={internalValue}
        onInput={handleOnInput}
        className="relative -top-4 h-3 w-60 cursor-pointer appearance-none rounded-full bg-transparent p-0 slider"
        type="range"
      />
    </label>
  )
}

const BasicProgressBar: FC<{progress: string}> = ({progress}) => {
  return (
    <div className="h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div
        style={{width: progress + "%"}}
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
