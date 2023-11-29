import {useState, MouseEvent} from 'react'

type Coordinates = {
  x: number
  y: number
}

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState<Coordinates>({x: 0, y: 0})
  const [open, setOpen] = useState<boolean>(false)

  const handleContextMenu = (e: MouseEvent) => {
    if (typeof document.hasFocus === 'function' && !document.hasFocus()) return

    e.preventDefault()
    setAnchorPoint({x: e.clientX, y: e.clientY})
    setOpen(true)
  }

  return {anchorPoint, open, handleContextMenu, setOpen}
}

export default useContextMenu
