import {IconProp} from "@fortawesome/fontawesome-svg-core"
import "../styles/ContextMenu.sass"
import {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

type Coordinates = {
  x: number
  y: number
}

export type ContextMenuItem = {
  label: string,
  action: () => void,
  icon?: IconProp
}

export type ContextMenuProps = {
  items: ContextMenuItem[],
  children: JSX.Element
}

export default function ContextMenu(props: ContextMenuProps) {
  const [anchorPoint, setAnchorPoint] = useState<Coordinates>({x: 0, y: 0})
  const [open, setOpen] = useState<boolean>(false)

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (typeof document.hasFocus === 'function' && !document.hasFocus()) return

    e.preventDefault()
    setAnchorPoint({x: e.clientX, y: e.clientY})
    setOpen(true)
  }

  const handleClickOutside = () => {
    if (open) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  return (
    <>
      <div onContextMenu={(e) => handleContextMenu(e)}>
        {props.children}
      </div>
      {open && <div className="ContextMenu" style={{
        position: 'absolute',
        left: `${anchorPoint.x}px`,
        top: `${anchorPoint.y}px`
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
