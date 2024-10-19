import useClickOutside from "@/hooks/util/useClickOutside"
import {assert} from "@/utils/util"
import {motion} from "framer-motion"
import type {CSSProperties, FC} from "react"
import type React from "react"
import {createPortal} from "react-dom"
import type {IconType} from "react-icons"
import {twMerge} from "tailwind-merge"
import {create} from "zustand"
import Typography, {TypographyVariant} from "./Typography"

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
  id: string
  children: React.ReactNode
  elements: ContextMenuItem[]
  actionType?: ClickActions
  className?: string
}

export type Points = {
  x: number
  y: number
}

type ContextMenuState = {
  activeMenuId: string | null
  points: Points | null
  showMenu: <T>(id: string, e: React.MouseEvent<T>) => void
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
  const {elementRef} = useClickOutside<HTMLDivElement>(hideMenu)
  const isActive = activeMenuId === id
  const isRightClick = actionType === ClickActions.RightClick
  const isLeftClick = actionType === ClickActions.LeftClick

  const onShowMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    showMenu(id, event)
  }

  assert(id.length > 0, "The context menu id should not be empty.")

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
        elements.length > 0 &&
        createPortal(
          <motion.div
            initial={{scale: 0.5, opacity: 0.5}}
            whileInView={{scale: 1, opacity: 1}}
            transition={{
              duration: 0.1,
            }}
            ref={elementRef}
            className="fixed z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border border-gray-100 bg-white p-1.5 shadow-lg"
            style={{
              left: `${points.x}px`,
              top: `${points.y}px`,
            }}>
            {elements.map((element, index) => (
              <button
                className="flex max-h-7 cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  element.onClick()
                  hideMenu()
                }}
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
                  className="line-clamp-1 font-medium text-gray-700">
                  {element.text}
                </Typography>
              </button>
            ))}
          </motion.div>,
          document.body
        )}
    </>
  )
}

export default ContextMenu
