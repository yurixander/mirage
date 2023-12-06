import "../styles/Checkbox.sass"

export type CheckBoxProps = {
  isSelected: boolean,
  onClick: () => void
}

export default function ToggleButton(props: CheckBoxProps) {
  const isSelectedClassName = props.isSelected ? "selected" : "default"

  return (
    <div className="ToggleButton">
      <div className={"container " + isSelectedClassName} onClick={props.onClick} />
    </div>
  )
}
