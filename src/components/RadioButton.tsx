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
