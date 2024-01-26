import {useEffect} from "react"
import {create} from "zustand"

type UniqueNumberState = {
  id: number
  incrementId: () => void
}

const useUniqueIdStore = create<UniqueNumberState>(set => ({
  id: 0,
  incrementId: () => {
    set((state: UniqueNumberState) => ({id: state.id + 1}))
  },
}))

export default function useUniqueNumber() {
  const {id, incrementId} = useUniqueIdStore()

  useEffect(() => {
    incrementId()
  }, [incrementId])

  return id
}
