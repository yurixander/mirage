import React, {useState} from "react"
import {twMerge} from "tailwind-merge"

export type ImageZoomProps = {
  className?: string
  src?: string
}

type ImagePoints = {
  x: number
  y: number
}

const DEFAULT_ZOOM_LEVEL = 100
const ZOOM_ACTIVE_LEVEL = 150
const ZOOM_LEVEL_MAX = 300

const COORDINATE_TO_PERCENT = 100

const ImageZoom: React.FC<ImageZoomProps> = ({className, src}) => {
  const [zoom, setZoom] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)
  const [position, setPosition] = useState<ImagePoints>({x: 0, y: 0})

  // When in zoom state, move the zoom to where the cursor is.
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) {
      return
    }

    const {left, top, width, height} =
      event.currentTarget.getBoundingClientRect()

    const x = ((event.clientX - left) / width) * COORDINATE_TO_PERCENT
    const y = ((event.clientY - top) / height) * COORDINATE_TO_PERCENT

    setPosition({x, y})
  }

  const toggleZoom = () => {
    if (zoom) {
      setZoomLevel(DEFAULT_ZOOM_LEVEL)
    } else {
      setZoomLevel(ZOOM_ACTIVE_LEVEL)
    }

    setZoom(!zoom)
  }

  // Zoom in and out with the mouse wheel.
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!zoom) {
      setZoom(true)
    }

    event.preventDefault()
    const delta = event.deltaY * -0.01

    setZoomLevel(prevZoomLevel =>
      Math.max(
        DEFAULT_ZOOM_LEVEL,
        Math.min(ZOOM_LEVEL_MAX, prevZoomLevel + delta * 10)
      )
    )
  }

  return (
    <div
      className={twMerge("max-w-screen-lg", className)}
      onDoubleClick={toggleZoom}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}>
      <img
        className="cursor-zoom-in transition-transform duration-300"
        src={src}
        alt="Img message zoom"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}

export default ImageZoom
