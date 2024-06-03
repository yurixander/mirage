import {type FC} from "react"
import {type PartialRoom} from "./SpaceList"
import {emojiRandom, generateUniqueNumber} from "@/utils/util"
import {SpaceDetail} from "./SpaceDetail"
import Room from "@/components/Room"

export type AllRoomsProps = {
  rooms: PartialRoom[]
  onRoomClick: (roomId: string) => void
  roomSelectedId?: number
}

const AllRooms: FC<AllRoomsProps> = ({rooms, onRoomClick, roomSelectedId}) => {
  return (
    <SpaceDetail id={generateUniqueNumber()} title="All rooms">
      <div className="flex flex-col gap-1">
        {rooms.map((room, index) => (
          <Room
            key={index}
            roomName={room.roomName}
            tagEmoji={emojiRandom()}
            isSelected={roomSelectedId === room.id}
            onRoomClick={() => {
              onRoomClick(room.roomId)
            }}
          />
        ))}
      </div>
    </SpaceDetail>
  )
}

export default AllRooms
