import {useCallback, useState} from "react"

type UseSelectionReturnType<T> = {
  selectedItem: T | undefined
  handleSelectionChange: (item: T) => void
}

const useSelection = <T>(
  items: T[],
  predicate: (item: T) => boolean
): UseSelectionReturnType<T> => {
  const initialSelectedItem = items.find(element => predicate(element))

  const [selectedItem, setSelectedItem] = useState<T | undefined>(
    initialSelectedItem
  )

  const handleSelectionChange = useCallback((item: T) => {
    setSelectedItem(item)
  }, [])

  return {selectedItem, handleSelectionChange}
}

export default useSelection
