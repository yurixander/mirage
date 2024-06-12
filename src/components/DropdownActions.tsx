import {type FC, useState} from "react"
import {type IconType} from "react-icons"
import {IoMdCheckmark} from "react-icons/io"
import Dropdown from "./Dropdown"
import Typography from "./Typography"

export type DropdownOption = {
  text: string
  Icon: IconType
}

export type DropdownActionsProps = {
  initiallyOption: DropdownOption
  options: DropdownOption[]
  onOptionSelected: (option: DropdownOption) => void
}

const DropdownActions: FC<DropdownActionsProps> = ({
  options,
  initiallyOption,
  onOptionSelected,
}) => {
  const [optionSelected, setOptionSelected] = useState(initiallyOption)

  return (
    <Dropdown
      initiallyContent={
        <div
          className="flex w-max items-center gap-1 hover:bg-neutral-100"
          role="button"
          aria-hidden
          onClick={() => {
            onOptionSelected(optionSelected)
          }}>
          <div className="flex size-6 items-center justify-center">
            <optionSelected.Icon size={20} />
          </div>

          <Typography className="font-medium">{optionSelected.text}</Typography>
        </div>
      }>
      <>
        {options.map(option => (
          <DropdownItem
            {...option}
            isSelected={option.text === optionSelected.text}
            onClick={() => {
              setOptionSelected(option)
              onOptionSelected(option)
            }}
          />
        ))}
      </>
    </Dropdown>
  )
}

type DropdownOptionProps = {
  text: string
  Icon: IconType
  isSelected: boolean
  onClick: () => void
}

const DropdownItem: FC<DropdownOptionProps> = ({
  Icon,
  text,
  isSelected,
  onClick,
}) => {
  return (
    <div
      role="button"
      aria-hidden
      onClick={onClick}
      className="flex w-full items-center gap-1 p-1 hover:bg-neutral-100">
      <div className="flex size-6 items-center justify-center">
        <Icon size={20} />
      </div>

      <Typography className="font-medium">{text}</Typography>

      {isSelected && <IoMdCheckmark className="ml-auto text-slate-300" />}
    </div>
  )
}

export default DropdownActions
