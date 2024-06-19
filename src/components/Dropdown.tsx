import useClickOutside from "@/hooks/util/useClickOutside"
import React, {useState, type FC} from "react"
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type DropdownProps = {
  initiallyContent: React.JSX.Element
  children: React.JSX.Element
  className?: string
}

const Dropdown: FC<DropdownProps> = ({
  className,
  initiallyContent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {dropdownRef} = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  return (
    <div
      ref={dropdownRef}
      className={twMerge(
        "flex max-w-xs flex-col overflow-hidden rounded-md border border-slate-300 bg-gray-50",
        className
      )}
      role="button"
      aria-hidden
      onClick={() => {
        setIsOpen(prevValue => !prevValue)
      }}>
      <div className="flex size-full items-center p-1">
        {initiallyContent}

        <div className="ml-auto text-slate-300">
          {isOpen ? <IoCaretUpOutline /> : <IoCaretDownOutline />}
        </div>
      </div>

      <div className="z-50 bg-gray-50">{isOpen && children}</div>
    </div>
  )
}

export default Dropdown
