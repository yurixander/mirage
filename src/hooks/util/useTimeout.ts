import {useEffect, useRef} from "react"

const useTimeout = (callback: () => void, delay: number | null) => {
  const callbackReference = useRef(callback)

  useEffect(() => {
    callbackReference.current = callback
  }, [callbackReference, callback])

  useEffect(() => {
    if (delay === null) {
      return
    }

    const handle = setTimeout(() => {
      callbackReference.current()
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [delay])
}

export default useTimeout
