import {useState, useRef, useCallback, useEffect} from "react"

function useQueue<T>(delay: number = 10_000) {
  const [current, setCurrent] = useState<T | null>(null)
  const queue = useRef<T[]>([])
  const timeoutReference = useRef<number | null>(null)

  const processQueue = useCallback(() => {
    if (queue.current.length === 0) {
      return
    }

    // Set the current item to the first item in the queue.
    const nextItem = queue.current.shift() ?? null

    setCurrent(nextItem)

    // Set a timeout to process the next item.
    timeoutReference.current = window.setTimeout(() => {
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

    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current)
      timeoutReference.current = null
    }

    // Clear current item immediately.
    setCurrent(null)
  }, [])

  // Clear timeout on unmount to prevent memory leaks.
  useEffect(() => {
    return () => {
      if (timeoutReference.current !== null) {
        clearTimeout(timeoutReference.current)
      }
    }
  }, [])

  return {current, pushItem, clearItems}
}

export default useQueue
