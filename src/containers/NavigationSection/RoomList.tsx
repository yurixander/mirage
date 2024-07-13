import Loader from "@/components/Loader"
import Room from "@/components/Room"
import useSpaceHierarchy from "@/hooks/matrix/useSpaceHierarchy"
import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RoomListProps = {
  spaceId?: string
  className?: string
}

const RoomList: FC<RoomListProps> = ({spaceId, className}) => {
  const {rooms, isLoading} = useSpaceHierarchy(spaceId)
  const [roomSelected, setRoomSelected] = useState<string>()

  return (
    <div
      id="room-list"
      className={twMerge(
        "flex flex-col overflow-y-scroll scrollbar-hide",
        className
      )}>
      {isLoading ? (
        <div className="flex size-full items-center justify-center">
          <Loader text="Loading rooms" />
        </div>
      ) : (
        rooms.map(room => (
          <Room
            roomId={room.roomId}
            roomName={room.roomName}
            type={room.type}
            key={room.roomId}
            isSelected={roomSelected === room.roomId}
            onRoomClick={setRoomSelected}
          />
        ))
      )}
    </div>
  )
}

export default RoomList
