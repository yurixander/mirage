import type React from "react"
import {useCallback, useEffect, useRef} from "react"

type UseClickOutsideReturnType<T> = {
  elementRef: React.RefObject<T>
}

const useClickOutside = <T>(
  action: () => void
): UseClickOutsideReturnType<T> => {
  const elementRef = useRef<T>(null)

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!(elementRef.current instanceof HTMLElement)) {
        return
      }

      if (e.target instanceof Node && elementRef.current?.contains(e.target)) {
        return
      }

      action()
    },
    [action]
  )

  useEffect(() => {
    const EVENT = "click"

    document.addEventListener(EVENT, handleClickOutside, true)

    return () => {
      document.addEventListener(EVENT, handleClickOutside, true)
    }
  }, [handleClickOutside])

  return {elementRef}
}

export default useClickOutside
