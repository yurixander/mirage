import {create} from "zustand"
import {type RoomState} from "./useActiveRoom"

type ActiveRoomIdStore = {
  activeRoomId: string | null
  roomState: RoomState | null
  clearActiveRoomId: () => void
  setRoomState: (roomState: RoomState) => void
  setActiveRoomId: (roomId: string, roomState?: RoomState) => void
}

const useActiveRoomIdStore = create<ActiveRoomIdStore>(set => ({
  activeRoomId: null,
  roomState: null,
  clearActiveRoomId() {
    set(_state => ({activeRoomId: null}))
  },
  setRoomState(roomState) {
    set(_state => ({roomState}))
  },
  setActiveRoomId(roomId, roomState) {
    set(_state => ({activeRoomId: roomId, roomState}))
  },
}))

export default useActiveRoomIdStore
