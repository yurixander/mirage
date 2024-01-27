import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useCallback, useEffect, type FC} from "react"
import {create} from "zustand"

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
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      showMenu(id, event.clientX, event.clientY)
    },
    [id, showMenu]
  )

  useEffect(() => {
    window.addEventListener("click", hideMenu)

    return () => {
      window.removeEventListener("click", hideMenu)
    }
  }, [hideMenu])

  const containerTwClassName = "flex flex-col m-10px gap-3px"

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>

      {isMenuActive && (
        <div
          className="absolute z-50 h-max w-44 animate-fadeIn rounded-5 bg-white shadow-contextMenu"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}>
          <div className={containerTwClassName}>
            {items.map((item, index) => (
              <div
                tabIndex={0}
                key={index}
                className="group flex cursor-pointer gap-10px p-10px text-textColorDefault hover:rounded-5 hover:bg-primary hover:text-white focus-visible:rounded-5 focus-visible:text-outlineTab focus-visible:outline-2 focus-visible:transition focus-visible:duration-150"
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
