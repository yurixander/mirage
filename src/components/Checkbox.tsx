import {type FC, useCallback, useState} from "react"
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
    // NOTE: An intermediate variable is used here to avoid a possible
    // logic error, since the `setIsSelected` function is asynchronous.
    const isNowSelected = !isSelected

    setSelected(isNowSelected)
    onSelectionChange(isNowSelected)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        setSelected(!isSelected)
      }
    },
    [isSelected]
  )

  const checkBoxTwClassName = twMerge("flex h-max w-max items-center gap-5px")
  const containerTwClassName = twMerge(
    "w-checkBoxSize h-checkBoxSize rounded-3",
    isDisabled
      ? "active:animate-none active:transform-none"
      : "active:scale-90 active:animate-hold",
    "focus-visible:outline-2 focus-visible:outline-outlineTab focus-visible:duration-150 focus-visible:outline-offset-1",
    isDisabled ? "cursor-not-allowed" : "cursor-pointer"
  )
  const defaultTwClassName = "border border-solid border-contrastDarker"
  const selectedTwClassName = "bg-primary"

  return (
    <div className={`${checkBoxTwClassName}`}>
      <div
        className={`${containerTwClassName} ${
          isSelected ? selectedTwClassName : defaultTwClassName
        }`}
        onClick={isDisabled ? undefined : handleSelectionChanged}
        tabIndex={isDisabled ? undefined : 0}
        onKeyDown={handleKeyDown}
      />
      {label && <div>{label}</div>}
    </div>
  )
}

export default Checkbox
