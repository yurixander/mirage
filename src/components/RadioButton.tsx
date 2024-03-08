import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RadioButtonProps = {
  isChecked: boolean
  label?: string
  isDisabled?: boolean
  onClick: () => void
}

const RadioButton: FC<RadioButtonProps> = ({
  isChecked,
  isDisabled,
  label,
  onClick,
}) => {
  const isDisabledClassName = isDisabled
    ? "cursor-not-allowed active:animate-none active:transform-none opacity-50"
    : "cursor-pointer active:scale-90 active:animate-hold"

  return (
    <>
      <div
        className={twMerge(
          "flex w-max items-center",
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        )}>
        <div
          className={twMerge(
            "box-border flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-[2px] border-purple-500",
            isDisabledClassName
          )}
          onClick={isDisabled ? undefined : onClick}
          tabIndex={isDisabled ? undefined : 0}
          aria-hidden="true">
          {isChecked && <div className="size-2 rounded-full bg-purple-500" />}
        </div>

        <div className="ml-[3px]">{label}</div>
      </div>
    </>
  )
}

export default RadioButton
