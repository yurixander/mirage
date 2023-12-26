import {useCallback, useState} from "react"
import "../styles/Checkbox.sass"

export type CheckboxProps = {
  isInitiallySelected: boolean
  onSelectionChange: (isSelected: boolean) => void
  label?: string
  isDisabled?: boolean
}

export default function Checkbox(props: CheckboxProps) {
  const [isSelected, setSelected] = useState(props.isInitiallySelected)

  const handleSelectionChanged = useCallback(() => {
    // NOTE: An intermediate variable is used here to avoid a possible
    // logic error, since the `setIsSelected` function is asynchronous.
    const isNowSelected = !isSelected

    setSelected(isNowSelected)
    props.onSelectionChange(isNowSelected)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") setSelected(!isSelected)
    },
    [isSelected]
  )

  return (
    <div className={`Checkbox ${props.isDisabled ? "disabled" : ""}`}>
      <div
        className={`container ${isSelected ? "selected" : "default"}`}
        onClick={props.isDisabled ? undefined : handleSelectionChanged}
        tabIndex={props.isDisabled ? undefined : 0}
        onKeyDown={handleKeyDown}
      />
      {props.label && <div className="label">{props.label}</div>}
    </div>
  )
}
