import {useEffect, useRef} from "react"

const timeouts = new Map<() => void, NodeJS.Timeout>()

export function smartTimeout(callback: () => void, delay: number) {
  if (timeouts.has(callback)) {
    window.alert("CLEARING TIMEOUT ...")
    clearTimeout(timeouts.get(callback))
  }

  timeouts.set(callback, setTimeout(callback, delay))
}

const useTimeout = (callback: () => void, delay: number | null) => {
  const cachedCallback = useRef(callback)

  useEffect(() => {
    cachedCallback.current = callback
  }, [cachedCallback])

  useEffect(() => {
    if (delay === null) return

    const id = setTimeout(() => {
      cachedCallback.current()
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [delay])
}

export default useTimeout
