import {useState} from "react"
import "../styles/Checkbox.sass"

export type CheckboxProps = {
  isInitiallySelected: boolean,
  onSelectionChange: (isSelected: boolean) => void
  label?: string
}

export default function Checkbox(props: CheckboxProps) {
  const [isSelected, setSelected] = useState(props.isInitiallySelected)
  const isSelectedClassName = isSelected ? "selected" : "default"

  const handleSelectionChanged = () => {
    const isNowSelected = !isSelected

    setSelected(isNowSelected)
    props.onSelectionChange(isNowSelected)
  }

  return (
    <div className="Checkbox">
      <div className={"container " + isSelectedClassName} onClick={handleSelectionChanged} />
      {props.label && <div className="label">{props.label}</div>}
    </div>
  )
}
