import React, {useState, type FC} from "react"

export type SliderProps = {
  min: number
  max: number
  step?: number
  initialValue?: string
  onInput: (value: string) => void
  isVariantBasic?: boolean
}

const Slider: FC<SliderProps> = ({
  onInput,
  min,
  max,
  step,
  initialValue,
  isVariantBasic = true,
}) => {
  const [progress, setProgress] = useState(initialValue)
  const [internalValue, setInternalValue] = useState(initialValue)

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setProgress(String((Number(value) * 100) / (max ?? 100)))
    setInternalValue(value)
    onInput(value)
  }

  return (
    <label className="flex flex-col gap-1">
      {isVariantBasic ? (
        <BasicProgressBar progress={progress ?? "50"} />
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

type BasicProgressBarProps = {
  progress: string
}

const BasicProgressBar: FC<BasicProgressBarProps> = ({progress}) => {
  return (
    <div className="h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div
        style={{width: progress + "%"}}
        className="h-3 bg-purple-500 shadow"
      />
    </div>
  )
}

type StepProgressBarProps = {
  steps: number
}
const StepProgressBar: FC<StepProgressBarProps> = ({steps}) => {
  const step = []
  for (let i = 1; i < steps; i++) {
    step.push(i)
  }

  return (
    <div className="flex h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div className="rounded-full bg-slate-300 text-end">
        <div className="size-3 rounded-full bg-white shadow" />
      </div>

      <Step />
      {step.map((opt, index) => (
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
