import React, {useEffect, useRef, useState, type FC} from "react"
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type DropdownProps = {
  initiallyContent: React.JSX.Element
  children: React.JSX.Element
  contentClassName?: string
  className?: string
}

const Dropdown: FC<DropdownProps> = ({
  className,
  initiallyContent,
  children,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Node && dropdownRef.current?.contains(e.target)) {
      return
    }

    setIsOpen(false)
  }

  useEffect(() => {
    const EVENT = "click"

    document.addEventListener(EVENT, handleClickOutside, true)

    return () => {
      document.addEventListener(EVENT, handleClickOutside, true)
    }
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

      {isOpen && (
        <div
          className={twMerge(
            "flex h-max w-full flex-col border-t border-t-slate-300 p-1",
            contentClassName
          )}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
