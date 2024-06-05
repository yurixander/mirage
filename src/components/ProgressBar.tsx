import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {IoIosAlert, IoIosCheckmarkCircle} from "react-icons/io"
import Typography from "./Typography"

export enum ProgressBarState {
  Progress,
  Completed,
  Error,
}

export enum ProgressBarVariant {
  Linear,
  Circular,
}

export type ProgressBarProps = {
  progress: number
  variant: ProgressBarVariant
  state?: ProgressBarState
  containsIcon?: boolean
  className?: string
}

const ProgressBar: FC<ProgressBarProps> = ({
  state,
  progress = ProgressBarState.Progress,
  containsIcon = true,
  variant = ProgressBarVariant.Linear,
  className,
}) => {
  const isCompleted = state === ProgressBarState.Completed
  const isError = state === ProgressBarState.Error
  const internalProgress = isCompleted || isError ? 100 : progress

  switch (variant) {
    case ProgressBarVariant.Linear: {
      return (
        <LinearProgressBar
          progress={internalProgress}
          isError={isError}
          isCompleted={isCompleted}
          containsIcon={containsIcon}
          className={className}
        />
      )
    }
    case ProgressBarVariant.Circular: {
      return (
        <CircularProgressBar
          progress={internalProgress}
          isError={isError}
          isCompleted={isCompleted}
          className={className}
        />
      )
    }
  }
}

type LinearProgressBarProps = {
  progress: number
  isError: boolean
  isCompleted: boolean
  containsIcon: boolean
  className?: string
}

const LinearProgressBar: FC<LinearProgressBarProps> = ({
  progress,
  isCompleted,
  isError,
  containsIcon = true,
  className,
}) => {
  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      <div
        className={twMerge(
          "h-2 w-full overflow-hidden rounded-full bg-gray-300"
        )}>
        <div
          className={twMerge(
            "relative flex h-full items-center justify-center text-center text-white duration-300",
            isCompleted
              ? "bg-green-500"
              : isError
                ? "bg-red-500"
                : "bg-purple-500"
          )}
          style={{width: `${progress}%`}}
        />
      </div>

      {isError && containsIcon && (
        <IoIosAlert className="text-red-500" size={13} />
      )}

      {isCompleted && containsIcon && (
        <IoIosCheckmarkCircle className="text-green-500" size={13} />
      )}
    </div>
  )
}

type CircularProgressBarProps = {
  progress: number
  isError: boolean
  isCompleted: boolean
  className?: string
}

const CircularProgressBar: FC<CircularProgressBarProps> = ({
  isCompleted,
  isError,
  progress,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex size-14 items-center justify-center rounded-full border-4",
        isCompleted && "border-green-500",
        isError && "shadow-circleProgressError border-red-500",
        !(isCompleted || isError) && "shadow-circleProgress border-purple-500",
        className
      )}>
      <Typography
        className={twMerge(
          "font-semibold",
          isError ? "text-red-500" : "text-black"
        )}>
        {isError ? "Error" : `${progress}%`}
      </Typography>
    </div>
  )
}

export default ProgressBar
