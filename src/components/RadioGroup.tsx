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

  return (
    <>
      <div
        className={twMerge(
          "flex gap-3",
          isColum === RadioGroupDirection.Column ? " flex-col" : " flex-row"
        )}>
        {items.map((item, index) => (
          <RadioButton
            key={index}
            {...item}
            isChecked={item === selectedItem}
            onClick={() => {
              handleSelectionChange(item)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default RadioGroup
