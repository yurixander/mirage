import {type FC, useState} from "react"
import {type IconType} from "react-icons"
import {IoIosArrowDown} from "react-icons/io"
import {twMerge} from "tailwind-merge"

export type DropdownProps = {
  options: DropdownOptionProps[]
}

const Dropdown: FC<DropdownProps> = ({options}) => {
  const [isDropdownOptionVisibility, setIsDropdownOptionVisibility] =
    useState(false)
  const [label, setLabel] = useState(options[0].label)
  const [indexIcon, setIndexIcon] = useState(0)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          setIsDropdownOptionVisibility(!isDropdownOptionVisibility)
        }}
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border bg-neutral-50 p-2 text-sm">
        <DropdownIcon Icon={options[indexIcon].Icon} />

        <div className="w-full text-left">{label}</div>

        <IoIosArrowDown />
      </button>

      <div
        className={twMerge(
          "absolute w-full rounded bg-white shadow-2xl",
          isDropdownOptionVisibility ? "inline-block" : "hidden"
        )}>
        {options.map((option, index) => (
          <DropdownOption
            label={option.label}
            Icon={option.Icon}
            onClick={() => {
              setIndexIcon(index)
              setLabel(option.label)
              setIsDropdownOptionVisibility(false)
              option.onClick()
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Dropdown

type DropdownOptionProps = {
  Icon: IconType
  label: string
  onClick: () => void
}

const DropdownOption: FC<DropdownOptionProps> = ({Icon, label, onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-50 p-2 text-left text-sm hover:bg-slate-100">
      <Icon size={20} />
      <div className="w-full">{label}</div>
    </button>
  )
}

type DropdownIconProps = {
  Icon: IconType
}

const DropdownIcon: FC<DropdownIconProps> = ({Icon}) => {
  return <Icon size={20} />
}
