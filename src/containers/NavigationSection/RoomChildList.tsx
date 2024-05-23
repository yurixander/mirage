import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import useSpaceRooms from "./hooks/useSpaceRooms"
import Room from "./Room"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

export type RoomChildListProps = {
  spaceId: string
  className?: string
}

const RoomChildList: FC<RoomChildListProps> = ({spaceId, className}) => {
  // TODO: Actualize room list when `room_name` is changed.

  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const {childRooms} = useSpaceRooms(spaceId)

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {childRooms.map(childRoom => (
        <Room
          key={childRoom.roomId}
          isSelected={activeRoomId === childRoom.roomId}
          roomName={childRoom.roomName}
          tagEmoji={emojiRandom()}
          roomId={childRoom.roomId}
          onRoomClick={setActiveRoomId}
        />
      ))}
    </div>
  )
}

export default memo(RoomChildList)
