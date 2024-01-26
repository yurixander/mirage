import {useEffect} from "react"

type KeyCombination = {
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  key: string
}

const useGlobalHotkey = (
  keyCombination: KeyCombination,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const {ctrl, shift, alt, key} = keyCombination

      if (
        event.ctrlKey === !!ctrl &&
        event.shiftKey === !!shift &&
        event.altKey === !!alt &&
        event.key.toLowerCase() === key.toLowerCase()
      ) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keyCombination, callback])
}

export default useGlobalHotkey
