import {type FC} from "react"
import RadioButton, {type RadioButtonProps} from "./RadioButton"
import {twMerge} from "tailwind-merge"

export type RadioGroupProps = {
  items: RadioButtonProps[]
  className: string
}

const RadioGroup: FC<RadioGroupProps> = ({items, className = "flex-col"}) => {
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
