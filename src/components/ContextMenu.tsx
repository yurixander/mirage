import {type CSSProperties, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {type IconType} from "react-icons"
import React from "react"
import {create} from "zustand"
import useClickOutside from "@/hooks/util/useClickOutside"
import {createPortal} from "react-dom"
import {twMerge} from "tailwind-merge"

export type ContextMenuItem = {
  text: string
  icon: IconType
  color?: CSSProperties["color"]
  onClick: () => void
}

export enum ClickActions {
  RightClick,
  LeftClick,
  Hold,
}

export type ContextMenuProps = {
  id: number
  children: React.JSX.Element
  elements: ContextMenuItem[]
  actionType?: ClickActions
  className?: string
}

export type Points = {
  x: number
  y: number
}

type ContextMenuState = {
  activeMenuId: number | null
  points: Points | null
  showMenu: <T>(id: number, e: React.MouseEvent<T>) => void
  hideMenu: () => void
}

export const useContextMenuStore = create<ContextMenuState>(set => ({
  activeMenuId: null,
  points: null,
  showMenu: (id, e) => {
    set({activeMenuId: id, points: {x: e.clientX, y: e.clientY}})

    e.preventDefault()
  },
  hideMenu: () => {
    set({activeMenuId: null, points: null})
  },
}))

const ContextMenu: FC<ContextMenuProps> = ({
  id,
  elements,
  children,
  className,
  actionType = ClickActions.RightClick,
}) => {
  const {activeMenuId, hideMenu, points, showMenu} = useContextMenuStore()
  const {dropdownRef} = useClickOutside<HTMLDivElement>(hideMenu)
  const isActive = activeMenuId === id
  const isRightClick = actionType === ClickActions.RightClick
  const isLeftClick = actionType === ClickActions.LeftClick

  const onShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    showMenu(id, event)
  }

  return (
    <>
      <button
        className={twMerge("appearance-none", className)}
        onContextMenu={isRightClick ? onShowMenu : undefined}
        onClick={isLeftClick ? onShowMenu : undefined}>
        {children}
      </button>

      {isActive &&
        points !== null &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border border-gray-100 bg-white p-1.5 shadow-lg"
            style={{
              left: `${points.x}px`,
              top: `${points.y}px`,
            }}>
            {elements.map((element, index) => (
              <div
                className="flex max-h-7 cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  element.onClick()
                  hideMenu()
                }}
                role="button"
                aria-hidden
                key={index}>
                <div className="flex size-5 items-center justify-center">
                  <element.icon
                    className="text-gray-700"
                    size={20}
                    style={{color: element.color}}
                  />
                </div>

                <Typography
                  variant={TypographyVariant.BodyMedium}
                  style={{color: element.color}}
                  className="font-medium text-gray-700">
                  {element.text}
                </Typography>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}

export default ContextMenu
