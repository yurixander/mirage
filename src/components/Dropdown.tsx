import {type FC} from "react"

export type DropdownOptionProps = {
  label: string
  value: string
  onClick: () => void
}

export type DropdownProps = {
  options: DropdownOptionProps[]
}

const Dropdown: FC<DropdownProps> = ({options}) => {
  return (
    <select className="flex items-center rounded-lg border border-neutral-300 bg-white p-2">
      {options.map((props, index) => (
        <option key={index} value={props.value} onClick={props.onClick}>
          {props.label}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
