import {useCallback, useEffect, type CSSProperties, type FC} from "react"
import Typography from "./Typography"
import {type IconType} from "react-icons"
import React from "react"
import {create} from "zustand"
import {IoArrowRedo, IoArrowUndo} from "react-icons/io5"
import {IoMdDownload, IoMdTrash} from "react-icons/io"

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

export type ContextMenuItem = {
  text: string
  icon: IconType
  color?: CSSProperties["color"]
  onClick: () => void
}

export type ContextMenuProps = {
  id: number
  elements: ContextMenuItem[]
  children: React.JSX.Element
}

type ContextMenuState = {
  activeMenuId: number | null
  x: number
  y: number
  showMenu: (id: number, x: number, y: number) => void
  hideMenu: () => void
}

const useContextMenuStore = create<ContextMenuState>(set => ({
  activeMenuId: null,
  x: 0,
  y: 0,
  showMenu: (id, x, y) => {
    set({activeMenuId: id, x, y})
  },
  hideMenu: () => {
    set({activeMenuId: null, x: 0, y: 0})
  },
}))

const ContextMenu: FC<ContextMenuProps> = ({id, elements, children}) => {
  const {activeMenuId, showMenu, hideMenu, x, y} = useContextMenuStore()
  const isActive = activeMenuId === id

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      showMenu(id, event.clientX, event.clientY)
    },
    [id, showMenu]
  )

  useEffect(() => {
    const EVENT = "click"

    window.addEventListener(EVENT, hideMenu)

    return () => {
      window.removeEventListener(EVENT, hideMenu)
    }
  }, [hideMenu])

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>

      {isActive && (
        <div
          className="absolute z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border-2 border-gray-100 bg-white p-1.5 shadow-lg"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}>
          {elements.map((element, index) => (
            <div
              className="flex max-h-7 cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
              onClick={element.onClick}
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
