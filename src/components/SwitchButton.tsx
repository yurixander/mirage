/* eslint-disable tailwindcss/enforces-shorthand */
import useSelectionToggle from "@/hooks/util/useSelectionToggle"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type SwitchButtonProps = {
  isInitiallySelected: boolean
  onSelectionChange: (isSelected: boolean) => void
  label?: string
  isDisabled?: boolean
}

const SwitchButton: FC<SwitchButtonProps> = ({
  isInitiallySelected,
  onSelectionChange,
  isDisabled,
  label,
}) => {
  const {isSelected, handleSelectionChanged, handleKeyDown} =
    useSelectionToggle(isInitiallySelected, onSelectionChange)

  return (
    <>
      <div
        className={twMerge(
          "flex items-center gap-3",
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        )}>
        <div
          className={twMerge(
            "flex h-6 w-11 items-center rounded-full p-1",
            isSelected ? "bg-purple-500 justify-end" : "bg-gray-300",
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={isDisabled ? undefined : handleSelectionChanged}
          tabIndex={isDisabled ? undefined : 0}
          onKeyDown={handleKeyDown}>
          <div className="relative h-4 w-4 rounded-full bg-white shadow-md" />
        </div>
        {label}
      </div>
    </>
  )
}

export default SwitchButton
