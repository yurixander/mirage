import {useState, type FC} from "react"
import RadioButton, {type RadioButtonProps} from "./RadioButton"
import {twMerge} from "tailwind-merge"

export type RadioGroupProps = {
  items: RadioButtonProps[]
  isColum?: RadioGroupDirection
}

export enum RadioGroupDirection {
  COLUM,
  ROW,
}

const RadioGroup: FC<RadioGroupProps> = ({
  items,
  isColum = RadioGroupDirection.COLUM,
}) => {
  const initialSelectedIndex = items.findIndex(item => item.isChecked)
  const [selectedItem, setSelectedItem] = useState<number | null>(
    initialSelectedIndex !== -1 ? initialSelectedIndex : null
  )

  const handleSelectionChange = (index: number) => {
    setSelectedItem(index)
  }

  return (
    <>
      <div
        className={twMerge(
          "flex gap-10px",
          isColum === RadioGroupDirection.COLUM ? " flex-col" : " flex-row"
        )}>
        {items.map((item, index) => (
          <RadioButton
            key={index}
            {...item}
            isChecked={index === selectedItem}
            onClick={() => {
              handleSelectionChange(index)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default RadioGroup
