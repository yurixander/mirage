import {type FC} from "react"

export type LRadioButtonProps = {
  label: string
  name: string
  onClick: () => void
}
const LRadioButton: FC<LRadioButtonProps> = ({label, name, onClick}) => {
  return (
    <>
      <label className="flex cursor-pointer">
        <input
          type="radio"
          name={name}
          value="purple"
          id="purple"
          onClick={onClick}
          className="size-4 cursor-pointer accent-purple-500"
        />
        <span className="px-1.5">{label}</span>
      </label>
    </>
  )
}
export default LRadioButton
