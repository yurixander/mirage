import {type Room} from "matrix-js-sdk"
import {create} from "zustand"

type RoomSelectedState = {
  selectedRoom?: Room
  selectRoom: (room: Room) => void
}

const useRoomSelector = create<RoomSelectedState>(set => ({
  selectRoom: roomId => {
    set(_state => ({selectedRoom: roomId}))
  },
}))

export default useRoomSelector
