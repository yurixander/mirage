import {useCallback, useState} from "react"

const useSelection = <T>(items: T[], predicate: (item: T) => boolean) => {
  const initialSelectedItem = items.find(predicate) ?? null

  const [selectedItem, setSelectedItem] = useState<T | null>(
    initialSelectedItem
  )

  const handleSelectionChange = useCallback((item: T) => {
    setSelectedItem(item)
  }, [])

  return {selectedItem, handleSelectionChange}
}

export default useSelection
