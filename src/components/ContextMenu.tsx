import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {type FC, useCallback, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {create} from "zustand"
import {twMerge} from "tailwind-merge"

export type ContextMenuItem = {
  label: string
  action: () => void
  icon?: IconProp
}

export type ContextMenuProps = {
  id: number
  items: ContextMenuItem[]
  children: JSX.Element
}

type ContextMenuState = {
  activeMenuId: number | null
  x: number
  y: number
  showMenu: (id: number, x: number, y: number) => void
  hideMenu: () => void
}

export const useContextMenuStore = create<ContextMenuState>(set => ({
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

const ContextMenu: FC<ContextMenuProps> = ({children, id, items}) => {
  const {activeMenuId, showMenu, hideMenu, x, y} = useContextMenuStore()
  const isMenuActive = activeMenuId === id

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      showMenu(id, e.clientX, e.clientY)
    },
    [id, showMenu]
  )

  useEffect(() => {
    window.addEventListener("click", hideMenu)

    return () => {
      window.removeEventListener("click", hideMenu)
    }
  }, [hideMenu])

  const contextMenuTwClassName = twMerge(
    "absolute h-max w-44 rounded-5 z-50 bg-white",
    "animate-fadeIn shadow-contextMenu"
  )
  const containerTwClassName = "flex flex-col m-10px gap-3px"
  const itemTwClassName = twMerge(
    "flex gap-10px p-10px cursor-pointer text-textColorDefault",
    "focus-visible:transition focus-visible:duration-150",
    "focus-visible:outline-2 focus-visible:text-outlineTab focus-visible:rounded-5",
    "hover:bg-primary hover:rounded-5 hover:text-white group"
  )
  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isMenuActive && (
        <div
          className={contextMenuTwClassName}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}>
          <div className={containerTwClassName}>
            {items.map((item, index) => (
              <div
                tabIndex={0}
                key={index}
                className={itemTwClassName}
                onClick={item.action}>
                <span className="mr-auto font-strong">{item.label}</span>
                {item.icon && (
                  <FontAwesomeIcon
                    className="text-textColorDefault group-hover:text-white"
                    icon={item.icon}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ContextMenu
