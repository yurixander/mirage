import {type FC} from "react"
import RadioButton, {type RadioButtonProps} from "./LRadioButton"
import {twMerge} from "tailwind-merge"

export type RadioGroupProps = {
  items: RadioButtonProps[]
  isColum?: RadioGroupDirection
}

export enum RadioGroupDirection {
  Column,
  Row,
}

const RadioGroup: FC<RadioGroupProps> = ({
  items,
  isColum = RadioGroupDirection.Column,
}) => {
  const directionClass =
    isColum === RadioGroupDirection.Column ? "flex-col" : "flex-row"

  return (
    <div className={twMerge("flex gap-4", directionClass)}>
      {items.map((props, index) => (
        <RadioButton
          id={props.id}
          key={props.key}
          value={props.value}
          label={props.label}
          name={props.name}
          onClick={() => {}}
        />
      ))}
    </div>
  )
}

export default RadioGroup
