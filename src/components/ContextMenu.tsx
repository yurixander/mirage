import {IconProp} from "@fortawesome/fontawesome-svg-core"
import "../styles/ContextMenu.sass"
import {useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import create from "zustand"

export type ContextMenuItem = {
  label: string,
  action: () => void,
  icon?: IconProp
}

export type ContextMenuProps = {
  items: ContextMenuItem[],
  children: JSX.Element
}


interface ContextMenuState {
  x: number
  y: number
  items: ContextMenuItem[]
  open: boolean
  showMenu: (x: number, y: number, items: ContextMenuItem[]) => void
  hideMenu: () => void
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  x: 0,
  y: 0,
  items: [],
  open: false,
  showMenu: (x, y, items) => set({x, y, items, open: true}),
  hideMenu: () => set({x: 0, y: 0, items: [], open: false}),
}))


export default function ContextMenu(props: ContextMenuProps) {
  const {x, y, items, open, showMenu, hideMenu} = useContextMenuStore()

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    showMenu(e.clientX, e.clientY, items)
  }

  useEffect(() => {
    const handleWindowClick = () => hideMenu()
    window.addEventListener('click', handleWindowClick)
    return () => window.removeEventListener('click', handleWindowClick)
  }, [hideMenu])

  return (
    <>
      <div onContextMenu={(e) => handleContextMenu(e)}>
        {props.children}
      </div>
      {open && <div className="ContextMenu" style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`
      }}>
        <div className="container">
          {props.items.map(item =>
            <div
              className="item"
              onClick={item.action}>
              <span className="text">{item.label}</span>
              {item.icon && <FontAwesomeIcon className="icon" icon={item.icon} />}
            </div>)}
        </div>
      </div>}
    </>
  )
}
