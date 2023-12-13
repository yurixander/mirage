import {IconProp} from "@fortawesome/fontawesome-svg-core"
import "../styles/ContextMenu.sass"
import {useCallback, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {create} from "zustand"

export type ContextMenuItem = {
  label: string,
  action: () => void,
  icon?: IconProp
}

export type ContextMenuProps = {
  id: string
  items: ContextMenuItem[]
  children: JSX.Element
}

type ContextMenuState = {
  activeMenuId: string | null
  x: number
  y: number
  showMenu: (id: string, x: number, y: number) => void
  hideMenu: () => void
}


export const useContextMenuStore = create<ContextMenuState>((set) => ({
  activeMenuId: null,
  x: 0,
  y: 0,
  showMenu: (id, x, y) => set({activeMenuId: id, x, y}),
  hideMenu: () => set({activeMenuId: null, x: 0, y: 0}),
}))


export default function ContextMenu(props: ContextMenuProps) {
  const {activeMenuId, showMenu, hideMenu, x, y} = useContextMenuStore()
  const isMenuActive = activeMenuId === props.id

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    showMenu(props.id, e.clientX, e.clientY)
  }, [props.id, showMenu])

  useEffect(() => {
    const handleWindowClick = () => hideMenu()

    window.addEventListener("click", handleWindowClick)
    return () => window.removeEventListener("click", handleWindowClick)
  }, [hideMenu])

  return (
    <>
      <div onContextMenu={handleContextMenu}>
        {props.children}
      </div>
      {isMenuActive && (
        <div
          className="ContextMenu"
          style={{
            position: "absolute",
            left: `${x}px`, top: `${y}px`
          }}>
          <div className="container">
            {props.items.map((item, index) => (
              <div
                tabIndex={0}
                key={index}
                className="item"
                onClick={item.action}>
                <span className="text">{item.label}</span>
                {item.icon && <FontAwesomeIcon className="icon" icon={item.icon} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
