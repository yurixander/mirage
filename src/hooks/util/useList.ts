import {useCallback, useState} from "react"

const useList = <T>(
  hasRepeat?: (element1: T, element2: T) => boolean,
  initialList?: T[]
) => {
  const [items, setItem] = useState<T[]>(initialList ?? [])

  const addItem = useCallback(
    (newItem: T) => {
      setItem(prevItems => {
        // If the item is already in the list, update it.
        let hasUpdated = false

        const updatedList = prevItems.map(prevItem => {
          if (hasRepeat && hasRepeat(prevItem, newItem)) {
            hasUpdated = true

            return newItem
          }

          return prevItem
        })

        return hasUpdated ? updatedList : [...updatedList, newItem]
      })
    },
    [hasRepeat]
  )

  const updateItem = useCallback(
    (newItem: T) => {
      setItem(prevItems =>
        prevItems.map(prevItem => {
          if (hasRepeat && hasRepeat(prevItem, newItem)) {
            return newItem
          }

          return prevItem
        })
      )
    },
    [hasRepeat]
  )

  const updateWhen = useCallback(
    (when: (element: T) => boolean, newItem: T) => {
      setItem(prevItems =>
        prevItems.map(prevItem => {
          if (when(prevItem)) {
            return newItem
          }

          return prevItem
        })
      )
    },
    []
  )

  const deleteItem = useCallback(
    (item: T) => {
      setItem(prevItems =>
        prevItems.filter(prevItem => hasRepeat && !hasRepeat(prevItem, item))
      )
    },
    [hasRepeat]
  )

  const deleteWhen = useCallback((when: (element: T) => boolean) => {
    setItem(prevItems => prevItems.filter(prevItem => !when(prevItem)))
  }, [])

  const clearItems = () => {
    setItem([])
  }

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    clearItems,
    deleteWhen,
    updateWhen,
  }
}

export default useList
