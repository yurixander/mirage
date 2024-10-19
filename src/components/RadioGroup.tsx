import type {FC} from "react"
import {twMerge} from "tailwind-merge"
import RadioButton, {type RadioButtonProps} from "./RadioButton"

export type RadioGroupProps = {
  items: RadioButtonProps[]
  className?: string
}

const RadioGroup: FC<RadioGroupProps> = ({items, className = "flex-col"}) => {
  // TODO: Handle here selection radiobutton group by name, value, checked, onChange.
  return (
    <div className={twMerge("flex gap-4", className)}>
      {items.map((props, index) => (
        <RadioButton
          id={props.id}
          key={index}
          value={props.value}
          label={props.label}
          name={props.name}
          onClick={props.onClick}
        />
      ))}
    </div>
  )
}

export default RadioGroup
