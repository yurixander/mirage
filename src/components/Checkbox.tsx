import useSelectionToggle from "@/hooks/util/useSelectionToggle"
import {type FC} from "react"
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
  const {isSelected, handleSelectionChanged, handleKeyDown} =
    useSelectionToggle(isInitiallySelected, onSelectionChange)

  const isDisabledClass = isDisabled
    ? "cursor-not-allowed active:animate-none active:transform-none"
    : "cursor-pointer active:scale-90 active:animate-hold"

  const isSelectedClass = isSelected
    ? "bg-purple-500"
    : "border border-neutral-300"

  return (
    <div className="flex size-max items-center gap-1">
      <div
        className={twMerge(
          "size-[13px] rounded-[3px] focus-visible:outline-[2px] focus-visible:outline-offset-[1px] focus-visible:outline-outlineTab focus-visible:duration-150",
          isSelectedClass,
          isDisabledClass
        )}
        onClick={isDisabled ? undefined : handleSelectionChanged}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked="false"
      />

      {label && <div>{label}</div>}
    </div>
  )
}

export default Checkbox
