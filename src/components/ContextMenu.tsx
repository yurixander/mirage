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
  items: ContextMenuItem[],
  children: JSX.Element
}

type ContextMenuState = {
  x: number
  y: number
  items: ContextMenuItem[]
  isOpen: boolean
  showMenu: (x: number, y: number, items: ContextMenuItem[]) => void
  hideMenu: () => void
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  x: 0,
  y: 0,
  items: [],
  isOpen: false,
  showMenu: (x, y, items) => set({x, y, items, isOpen: true}),
  hideMenu: () => set({x: 0, y: 0, items: [], isOpen: false}),
}))


export default function ContextMenu(props: ContextMenuProps) {
  const {x, y, items, isOpen, showMenu, hideMenu} = useContextMenuStore()

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    showMenu(e.clientX, e.clientY, items)
  }, [items])

  useEffect(() => {
    const handleWindowClick = () => hideMenu()

    window.addEventListener('click', handleWindowClick)

    return () => window.removeEventListener('click', handleWindowClick)
  }, [hideMenu])

  return (
    <>
      <div onContextMenu={handleContextMenu}>
        {props.children}
      </div>
      {isOpen && <div className="ContextMenu" style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`
      }}>
        <div className="container">
          {props.items.map((item, index) =>
            <div
              key={index}
              className="item"
              onClick={item.action}>
              <span className="text">{item.label}</span>
              {item.icon &&
                <FontAwesomeIcon className="icon" icon={item.icon} />}
            </div>)}
        </div>
      </div>}
    </>
  )
}
