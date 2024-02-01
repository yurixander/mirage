/* eslint-disable tailwindcss/enforces-shorthand */
import {useCallback, useState, type FC} from "react"
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

  return (
    <>
      <div
        className={twMerge(
          "flex items-center gap-10px",
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        )}>
        <div
          className={twMerge(
            "flex h-6 w-11 cursor-pointer items-center rounded-full p-1",
            isSelected ? "bg-purple-500 justify-end" : "bg-gray-300"
          )}
          onClick={isDisabled ? undefined : handleSelectionChanged}
          tabIndex={isDisabled ? undefined : 0}
          onKeyDown={handleKeyDown}>
          <div
            className={
              "relative h-4 w-4 rounded-full bg-white shadow-md"
            }></div>
        </div>
        {label}
      </div>
    </>
  )
}

export default SwitchButton
