import {useEffect, useRef} from "react"

const useTimeout = (callback: () => void, delay: number | null) => {
  const cachedCallback = useRef(callback)

  useEffect(() => {
    cachedCallback.current = callback
  }, [cachedCallback, callback])

  useEffect(() => {
    if (delay === null) {
      return
    }

    const handle = setTimeout(() => {
      cachedCallback.current()
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [delay])
}

export default useTimeout
