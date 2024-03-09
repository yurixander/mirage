import {useCallback, useState} from "react"

const useSelection = <T>(items: T[], predicate: (item: T) => boolean) => {
  const initialSelectedItem = items.find((element) => predicate(element))

  const [selectedItem, setSelectedItem] = useState<T | undefined>(
    initialSelectedItem
  )

  const handleSelectionChange = useCallback((item: T) => {
    setSelectedItem(item)
  }, [])

  return {selectedItem, handleSelectionChange}
}

export default useSelection
