import {useCallback, useEffect, useRef} from "react"

const useClickOutside = <T>(action: () => void) => {
  const dropdownRef = useRef<T>(null)

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!(dropdownRef.current instanceof HTMLElement)) {
        return
      }

      if (e.target instanceof Node && dropdownRef.current?.contains(e.target)) {
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

  return {dropdownRef}
}

export default useClickOutside
