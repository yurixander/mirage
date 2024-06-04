import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {IoIosAlert, IoIosCheckmarkCircle} from "react-icons/io"

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
  state?: ProgressBarState
  containsIcon?: boolean
  className?: string
}

const ProgressBar: FC<ProgressBarProps> = ({
  state,
  progress = ProgressBarState.Progress,
  containsIcon = true,
  className,
}) => {
  const isCompleted = state === ProgressBarState.Completed
  const isError = state === ProgressBarState.Error
  const internalProgress = isCompleted || isError ? 100 : progress

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
          style={{width: `${internalProgress}%`}}
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

export default ProgressBar
