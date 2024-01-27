import {useCallback, useState, type FC} from "react"
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
  const [isSelected, setSelected] = useState(isInitiallySelected)

  const handleSelectionChanged = () => {
    const nextIsSelected = !isSelected

    setSelected(previous => !previous)
    onSelectionChange(nextIsSelected)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        setSelected(!isSelected)
      }
    },
    [isSelected]
  )

  const isDisabledClass = isDisabled
    ? "cursor-not-allowed active:animate-none active:transform-none"
    : "cursor-pointer active:scale-90 active:animate-hold"

  const isSelectedClass = isSelected
    ? "bg-primary"
    : "border border-solid border-contrastDarker"

  return (
    <div className="flex size-max items-center gap-5px">
      <div
        className={twMerge(
          "w-checkBoxSize h-checkBoxSize rounded-3 focus-visible:outline-2 focus-visible:outline-outlineTab focus-visible:duration-150 focus-visible:outline-offset-1",
          isSelectedClass,
          isDisabledClass
        )}
        onClick={isDisabled ? undefined : handleSelectionChanged}
        tabIndex={isDisabled ? undefined : 0}
        onKeyDown={handleKeyDown}
      />

      {label && <div>{label}</div>}
    </div>
  )
}

export default Checkbox
