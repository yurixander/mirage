import {useEffect, useRef} from "react"

const useTimeout = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callbackRef, callback])

  useEffect(() => {
    if (delay === null) {
      return
    }

    const handle = setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [delay])
}

export default useTimeout
