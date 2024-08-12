import {type FC, useState} from "react"
import {type IconType} from "react-icons"
import {IoMdCheckmark} from "react-icons/io"
import Dropdown from "./Dropdown"
import Typography from "./Typography"
import {assert} from "@/utils/util"

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

  assert(options.length > 0, "The options for dropdown should not be empty.")

  return (
    <Dropdown
      initiallyContent={
        <button
          className="flex w-max appearance-none items-center gap-1 hover:bg-neutral-100"
          onClick={() => {
            onOptionSelected(optionSelected)
          }}>
          <div className="flex size-6 items-center justify-center">
            <optionSelected.Icon size={20} />
          </div>

          <Typography className="font-medium">{optionSelected.text}</Typography>
        </button>
      }>
      <>
        {options.map((option, index) => (
          <DropdownItem
            key={index}
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
  assert(text.length > 0, "Dropdown item text should not be empty.")

  return (
    <button
      onClick={onClick}
      className="flex w-full appearance-none items-center gap-1 p-1 hover:bg-neutral-100">
      <div className="flex size-6 items-center justify-center">
        <Icon size={20} />
      </div>

      <Typography className="font-medium">{text}</Typography>

      {isSelected && <IoMdCheckmark className="ml-auto text-slate-300" />}
    </button>
  )
}

export default DropdownActions
