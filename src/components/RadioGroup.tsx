import {type FC} from "react"
import RadioButton, {
  type RadioButtonProps as RadioButtonProperties,
} from "./RadioButton"
import {twMerge} from "tailwind-merge"
import useSelection from "@/hooks/util/useSelection"

export type RadioGroupProps = {
  items: RadioButtonProperties[]
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
  const {selectedItem, handleSelectionChange} =
    useSelection<RadioButtonProperties>(items, item => item.isChecked)

  const directionClass =
    isColum === RadioGroupDirection.Column ? "flex-col" : "flex-row"

  return (
    <div className={twMerge("flex gap-3", directionClass)}>
      {items.map((properties, index) => (
        <RadioButton
          key={index}
          {...properties}
          isChecked={properties === selectedItem}
          onClick={() => {
            handleSelectionChange(properties)
          }}
        />
      ))}
    </div>
  )
}

export default RadioGroup
