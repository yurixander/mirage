import React, {useState, type FC} from "react"
import Typography from "./Typography"
import {type IconType} from "react-icons"

export type SliderProps = {
  label?: string
  min?: number
  max?: number
  step?: number
  initialValue?: string
  onInput: (value: string) => void
  isVariantBasic?: boolean
  Icon: IconType
}

const Slider: FC<SliderProps> = ({
  label,
  onInput,
  min,
  max,
  step,
  initialValue,
  isVariantBasic = true,
  Icon,
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
      <div className="flex items-center gap-1">
        <Icon />
        <Typography>{label}</Typography>
      </div>

      {isVariantBasic ? (
        <BasicProgressBar progress={progress ?? "50"} />
      ) : (
        <StepProgressBar />
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

export default Slider

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

const StepProgressBar: FC = () => {
  return (
    <div className="flex h-3 w-60 overflow-hidden rounded-full bg-slate-200 shadow">
      <div className="rounded-full bg-slate-300 text-end">
        <div className="size-3 rounded-full bg-white shadow" />
      </div>

      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
    </div>
  )
}

const Step: FC = () => {
  return (
    <div className="w-full">
      <div className="float-right size-3 rounded-full bg-white shadow" />
    </div>
  )
}
