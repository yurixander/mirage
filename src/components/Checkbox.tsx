import {type FC, useCallback, useState} from "react"
import "../styles/Checkbox.sass"

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

  const handleSelectionChanged = useCallback(() => {
    // NOTE: An intermediate variable is used here to avoid a possible
    // logic error, since the `setIsSelected` function is asynchronous.
    const isNowSelected = !isSelected

    setSelected(isNowSelected)
    onSelectionChange(isNowSelected)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") setSelected(!isSelected)
    },
    [isSelected]
  )

  return (
    <div className={`Checkbox ${isDisabled ? "disabled" : ""}`}>
      <div
        className={`container ${isSelected ? "selected" : "default"}`}
        onClick={isDisabled ? undefined : handleSelectionChanged}
        tabIndex={isDisabled ? undefined : 0}
        onKeyDown={handleKeyDown}
      />
      {label && <div className="label">{label}</div>}
    </div>
  )
}

export default Checkbox
