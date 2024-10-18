import type {Points} from "@/components/ContextMenu"
import {useState} from "react"

type UseElementPointsReturnType = {
  points: Points | null
  setPointsByEvent: <T>(event: React.MouseEvent<T>) => void
  clearPoints: () => void
}

const useElementPoints = (): UseElementPointsReturnType => {
  const [points, setPoints] = useState<Points | null>(null)

  const setPointsByEvent = <T>(event: React.MouseEvent<T>): void => {
    event.stopPropagation()

    setPoints({x: event.clientX, y: event.clientY})
  }

  const clearPoints = (): void => {
    setPoints(null)
  }

  return {
    points,
    setPointsByEvent,
    clearPoints,
  }
}

export default useElementPoints
