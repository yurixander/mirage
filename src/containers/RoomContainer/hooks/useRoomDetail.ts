import useRoomListener from "@/hooks/matrix/useRoomListener"
import {getRoomTopic} from "@/utils/matrix"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useEffect, useState} from "react"

export type RoomDetail = {
  roomName: string
  roomDescription?: string
  isRoomEncrypted: boolean
}

const useRoomDetail = (room: Room | null): RoomDetail => {
  const [roomDetail, setRoomDetail] = useState<RoomDetail>({
    roomName: "",
    isRoomEncrypted: false,
  })

  useEffect(() => {
    if (room === null) {
      return
    }

    const descriptionResult = getRoomTopic(room) ?? undefined

    const isRoomEncrypted = room.hasEncryptionStateEvent()

    setRoomDetail({
      roomName: room.name,
      roomDescription: descriptionResult,
      isRoomEncrypted,
    })
  }, [room])

  useRoomListener(room, RoomEvent.Name, room => {
    setRoomDetail(({roomDescription, isRoomEncrypted}) => {
      return {
        roomName: room.name,
        roomDescription,
        isRoomEncrypted,
      }
    })
  })

  return roomDetail
}

export default useRoomDetail
