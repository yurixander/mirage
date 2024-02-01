import {useState, type FC} from "react"
import RadioButton, {type RadioButtonProps} from "./RadioButton"
import {twMerge} from "tailwind-merge"

export type RadioGroupProps = {
  items: RadioButtonProps[]
  isColum?: RadioGroupDirection
}

export enum RadioGroupDirection {
  COLUMN,
  ROW,
}

const RadioGroup: FC<RadioGroupProps> = ({
  items,
  isColum = RadioGroupDirection.COLUMN,
}) => {
  const initialSelectedItem = items.find(item => item.isChecked) ?? null
  const [selectedItem, setSelectedItem] = useState<RadioButtonProps | null>(
    initialSelectedItem
  )

  const handleSelectionChange = (item: RadioButtonProps) => {
    setSelectedItem(item)
  }

  return (
    <>
      <div
        className={twMerge(
          "flex gap-10px",
          isColum === RadioGroupDirection.COLUMN ? " flex-col" : " flex-row"
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
