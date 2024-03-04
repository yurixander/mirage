import {type FC} from "react"
import RadioButton, {type RadioButtonProps} from "./RadioButton"
import {twMerge} from "tailwind-merge"
import useSelection from "@/hooks/util/useSelection"

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
  const {selectedItem, handleSelectionChange} = useSelection<RadioButtonProps>(
    items,
    item => item.isChecked
  )

  const directionClass =
    isColum === RadioGroupDirection.Column ? "flex-col" : "flex-row"

  return (
    <div className={twMerge("flex gap-3", directionClass)}>
      {items.map((props, index) => (
        <RadioButton
          key={index}
          {...props}
          isChecked={props === selectedItem}
          onClick={() => {
            handleSelectionChange(props)
          }}
        />
      ))}
    </div>
  )
}

export default RadioGroup
