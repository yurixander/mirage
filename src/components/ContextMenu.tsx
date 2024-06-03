import {type CSSProperties, type FC} from "react"
import Typography from "./Typography"
import {type IconType} from "react-icons"
import React from "react"
import {create} from "zustand"
import {
  IoAddCircle,
  IoArrowRedo,
  IoArrowUndo,
  IoReloadCircle,
  IoSearchCircle,
} from "react-icons/io5"
import {IoIosSettings, IoMdDownload, IoMdTrash} from "react-icons/io"
import useClickOutside from "@/hooks/util/useClickOutside"

export const CONTEXT_MENU_REPLY = {
  text: "Reply",
  icon: IoArrowUndo,
}

export const CONTEXT_MENU_RESEND = {
  text: "Resend",
  icon: IoArrowRedo,
}

export const CONTEXT_MENU_SAVE = {
  text: "Save",
  icon: IoMdDownload,
}

export const CONTEXT_MENU_DELETE = {
  text: "Delete",
  icon: IoMdTrash,
  color: "red",
}

export const CONTEXT_MENU_SETTINGS = {
  text: "Settings",
  icon: IoIosSettings,
}

export const CONTEXT_MENU_RELOAD = {
  text: "Reload",
  icon: IoReloadCircle,
}

export const CONTEXT_MENU_ADD = {
  text: "Add",
  icon: IoAddCircle,
}

export const CONTEXT_MENU_SEARCH = {
  text: "Search",
  icon: IoSearchCircle,
}

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

  const onShowMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    showMenu(id, event)
  }

  return (
    <>
      <div
        className={className}
        role="button"
        aria-hidden
        onClick={isLeftClick ? onShowMenu : undefined}
        onContextMenu={isRightClick ? onShowMenu : undefined}>
        {children}
      </div>

      {isActive && points !== null && (
        <div
          ref={dropdownRef}
          className="absolute z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border border-gray-100 bg-white p-1.5 shadow-lg"
          style={{
            left: `${points.x}px`,
            top: `${points.y}px`,
          }}>
          {elements.map((element, index) => (
            <div
              className="flex max-h-7 cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
              onClick={e => {
                element.onClick()
                hideMenu()
              }}
              role="button"
              aria-hidden="true"
              key={index}>
              <div className="flex size-5 items-center justify-center">
                <element.icon
                  className="text-gray-700"
                  size={20}
                  style={{color: element.color}}
                />
              </div>

              <Typography
                style={{color: element.color}}
                className="font-medium text-gray-700">
                {element.text}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ContextMenu
