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

const ContextMenu: FC<ContextMenuProps> = ({children, id, items}) => {
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
          className="absolute z-50 h-max w-44 animate-fadeIn rounded-[5px] bg-white shadow-contextMenu"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}>
          <div className="m-3 flex flex-col gap-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="group flex cursor-pointer gap-3 p-3 text-stone-600 hover:rounded-[5px] hover:bg-purple-500 hover:text-white focus-visible:rounded-[5px] focus-visible:text-outlineTab focus-visible:outline-[2px] focus-visible:transition focus-visible:duration-150"
                onClick={item.action}
                aria-hidden="true">
                <span className="mr-auto font-semibold">{item.label}</span>

                {item.icon && (
                  <FontAwesomeIcon
                    className="text-stone-600 group-hover:text-white"
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
