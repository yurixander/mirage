import {useState, useCallback} from "react"

type SelectionToggleHook = (
  isInitiallySelected: boolean,
  onSelectionChange: (isSelected: boolean) => void
) => {
  isSelected: boolean
  handleSelectionChanged: () => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

const useSelectionToggle: SelectionToggleHook = (
  isInitiallySelected,
  onSelectionChange
) => {
  const [isSelected, setSelected] = useState(isInitiallySelected)

  const handleSelectionChanged = () => {
    const nextIsSelected = !isSelected
    setSelected(nextIsSelected)
    onSelectionChange(nextIsSelected)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSelectionChanged()
      }
    },
    [isSelected, handleSelectionChanged]
  )

  return {isSelected, handleSelectionChanged, handleKeyDown}
}

export default useSelectionToggle
