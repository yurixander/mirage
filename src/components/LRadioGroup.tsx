import {type FC} from "react"
import LRadioButton, {type LRadioButtonProps} from "./LRadioButton"
import {twMerge} from "tailwind-merge"

export type LRadioGroupProps = {
  items: LRadioButtonProps[]
  isColum?: LRadioGroupDirection
}
export enum LRadioGroupDirection {
  Column,
  Row,
}
const LRadioGroup: FC<LRadioGroupProps> = ({
  items,
  isColum = LRadioGroupDirection.Column,
}) => {
  const directionClass =
    isColum === LRadioGroupDirection.Column ? "flex-col" : "flex-row"
  return (
    <div className={twMerge("flex gap-4", directionClass)}>
      {items.map((props, index) => (
        <LRadioButton
          label={props.label}
          name={props.name}
          onClick={() => {}}
        />
      ))}
    </div>
  )
}

export default LRadioGroup
