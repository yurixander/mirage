import {assert} from "@/utils/util"
import {type FC} from "react"

export type RadioButtonProps = {
  label: string
  name: string
  id: string
  value: string
  onClick: () => void
}

const RadioButton: FC<RadioButtonProps> = ({
  label,
  name,
  id,
  value,
  onClick,
}) => {
  assert(label.length > 0, "RadioButton label should not be empty.")
  assert(id.length > 0, "RadioButton id should not be empty.")
  assert(value.length > 0, "RadioButton value should not be empty.")
  assert(name.length > 0, "RadioButton name should not be empty.")

  return (
    <label className="flex cursor-pointer">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onClick={onClick}
        className="size-4 cursor-pointer accent-purple-500"
      />

      <span className="px-1.5">{label}</span>
    </label>
  )
}

export default RadioButton
