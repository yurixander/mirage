import {create} from "zustand"

type ActiveRoomIdStore = {
  activeRoomId: string | null
  clearActiveRoomId: () => void
  setActiveRoomId: (roomId: string) => void
}

const useActiveRoomIdStore = create<ActiveRoomIdStore>(set => ({
  activeRoomId: null,
  roomState: null,
  clearActiveRoomId() {
    set(_state => ({activeRoomId: null}))
  },
  setActiveRoomId(roomId) {
    set(_state => ({activeRoomId: roomId}))
  },
}))

export default useActiveRoomIdStore
