import {useState, useRef, useCallback, useEffect} from "react"

function useQueue<T>(delay: number = 10_000) {
  const [current, setCurrent] = useState<T | null>(null)
  const queue = useRef<T[]>([])
  const timeoutRef = useRef<number | null>(null)

  const processQueue = useCallback(() => {
    if (queue.current.length === 0) {
      return
    }

    // Set the current item to the first item in the queue.
    const nextItem = queue.current.shift() ?? null

    setCurrent(nextItem)

    // Set a timeout to process the next item.
    timeoutRef.current = window.setTimeout(() => {
      setCurrent(null)

      // Process the next item after delay.
      processQueue()
    }, delay)
  }, [delay])

  const pushItem = useCallback(
    (message: T) => {
      queue.current.push(message)

      // If nothing is currently shown, process the next item immediately.
      if (!current) {
        processQueue()
      }
    },
    [current, processQueue]
  )

  const clearItems = useCallback(() => {
    queue.current = []

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // Clear current item immediately.
    setCurrent(null)
  }, [])

  // Clear timeout on unmount to prevent memory leaks.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {current, pushItem, clearItems}
}

export default useQueue
