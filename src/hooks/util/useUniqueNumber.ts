import {useEffect} from "react"
import {create} from "zustand"

type ZustandUniqueIdStore = {
  id: number
  increment: () => void
}

const useUniqueIdStore = create<ZustandUniqueIdStore>(set => ({
  id: 0,
  increment: () => {
    set((state: ZustandUniqueIdStore) => ({id: state.id + 1}))
  },
}))

export default function useUniqueId() {
  const {id, increment} = useUniqueIdStore()

  useEffect(() => {
    increment()
  }, [increment])

  return id
}
