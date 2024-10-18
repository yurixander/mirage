import useSelectionToggle from "@/hooks/util/useSelectionToggle"
import type {FC} from "react"
import {twMerge} from "tailwind-merge"

export type CheckboxProps = {
  isInitiallySelected: boolean
  onSelectionChange: (isSelected: boolean) => void
  label?: string
  isDisabled?: boolean
}

const Checkbox: FC<CheckboxProps> = ({
  isInitiallySelected,
  onSelectionChange,
  label,
  isDisabled,
}) => {
  const {handleSelectionChanged, handleKeyDown, isSelected} =
    useSelectionToggle(isInitiallySelected, onSelectionChange)

  return (
    <div className="flex size-max items-center gap-1">
      <input
        checked={isSelected}
        type="checkbox"
        onClick={handleSelectionChanged}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        disabled={isDisabled}
        className="size-3.5 cursor-pointer accent-purple-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-400 focus-visible:duration-150"
      />

      {label && (
        <div className={twMerge(isDisabled && "opacity-60")}>{label}</div>
      )}
    </div>
  )
}

export default Checkbox
