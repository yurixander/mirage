/* eslint-disable tailwindcss/enforces-shorthand */
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
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        )}>
        <div
          className={twMerge(
            "h-4 w-4 cursor-pointer box-border border-[2px] border-purple-500 rounded-full flex justify-center items-center",
            isDisabledClassName
          )}
          onClick={isDisabled ? undefined : onClick}
          tabIndex={isDisabled ? undefined : 0}>
          {isChecked && <div className="h-2 w-2 rounded-full bg-purple-500" />}
        </div>
        <div className="ml-[3px]">{label}</div>
      </div>
    </>
  )
}

export default RadioButton
