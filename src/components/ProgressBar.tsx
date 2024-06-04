import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "./Typography"
import {IoIosAlert, IoIosCheckmarkCircle} from "react-icons/io"

export enum ProgressBarState {
  Progress,
  Completed,
  Error,
}

export type ProgressBarProps = {
  progress: number
  state: ProgressBarState
  className?: string
}

const ProgressBar: FC<ProgressBarProps> = ({state, progress, className}) => {
  const isCompleted = state === ProgressBarState.Completed
  const isError = state === ProgressBarState.Error

  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      {isCompleted || isError ? (
        <>
          <div
            className={twMerge(
              "h-2 w-full rounded-full",
              isCompleted && "bg-green-500",
              isError && "bg-red-500"
            )}
          />

          {isError && <IoIosAlert className="text-red-500" size={13} />}

          {isCompleted && (
            <IoIosCheckmarkCircle className="text-green-500" size={13} />
          )}
        </>
      ) : (
        <>
          <div
            className={twMerge(
              "h-2 w-full overflow-hidden rounded-full bg-gray-300"
            )}>
            <div
              className="relative flex h-full items-center justify-center bg-purple-500 text-center text-white duration-300"
              style={{width: `${progress}%`}}
            />
          </div>

          <Typography variant={TypographyVariant.P}>{progress}%</Typography>
        </>
      )}
    </div>
  )
}

export default ProgressBar
