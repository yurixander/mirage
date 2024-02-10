import {create} from "zustand"

type RoomSelectedState = {
  selectedRoom?: string
  selectRoom: (room: string) => void
}

const useRoomSelector = create<RoomSelectedState>(set => ({
  selectRoom: roomId => {
    set(_state => ({selectedRoom: roomId}))
  },
}))

export default useRoomSelector
