import useSelectionToggle from "@/hooks/util/useSelectionToggle"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type SwitchButtonProps = {
  isInitiallySelected: boolean
  label?: string
  isDisabled?: boolean
  onSelectionChange: (isSelected: boolean) => void
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
    <div
      className={twMerge(
        "flex items-center gap-3",
        isDisabled === true && "cursor-not-allowed opacity-50"
      )}>
      <div
        onClick={isDisabled ? undefined : handleSelectionChanged}
        tabIndex={isDisabled ? undefined : 0}
        onKeyDown={handleKeyDown}
        aria-hidden="true"
        aria-checked="false"
        role="switch"
        className={twMerge(
          "flex h-6 w-11 items-center rounded-full p-1",
          isSelected ? "justify-end bg-purple-500" : "bg-gray-300",
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        )}>
        <div className="relative size-4 rounded-full bg-white shadow-md" />
      </div>
      {label}
    </div>
  )
}

export default SwitchButton
