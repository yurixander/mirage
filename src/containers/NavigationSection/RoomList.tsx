import Detail from "@/components/Detail"
import Loader from "@/components/Loader"
import Room, {RoomType} from "@/components/Room"
import useSpaceHierarchy from "@/hooks/matrix/useSpaceHierarchy"
import {useMemo, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RoomListProps = {
  spaceId?: string
  className?: string
}

const RoomList: FC<RoomListProps> = ({spaceId, className}) => {
  const {rooms, isLoading} = useSpaceHierarchy(spaceId)
  const [roomSelected, setRoomSelected] = useState<string>()

  const directRooms = useMemo(
    () => rooms.filter(room => room.type === RoomType.Direct),
    [rooms]
  )

  const groupRooms = useMemo(
    () => rooms.filter(room => room.type === RoomType.Group),
    [rooms]
  )

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
        <div className="flex flex-col gap-4 p-3">
          <Detail title="Direct chats" id="direct-chats-detail">
            <div className="flex flex-col gap-0.5">
              {directRooms.map(directRoom => (
                <Room
                  roomName={directRoom.roomName}
                  roomId={directRoom.roomId}
                  type={directRoom.type}
                  onRoomClick={setRoomSelected}
                  isSelected={roomSelected === directRoom.roomId}
                />
              ))}
            </div>
          </Detail>

          <Detail title="Rooms" id="rooms-detail" isInitiallyOpen>
            <div className="flex flex-col gap-0.5">
              {groupRooms.map(directRoom => (
                <Room
                  roomName={directRoom.roomName}
                  roomId={directRoom.roomId}
                  type={directRoom.type}
                  onRoomClick={setRoomSelected}
                  isSelected={roomSelected === directRoom.roomId}
                />
              ))}
            </div>
          </Detail>
        </div>
      )}
    </div>
  )
}

export default RoomList
