import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import useSpaceRooms from "./hooks/useSpaceRooms"
import Room from "./Room"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

export type RoomChildListProps = {
  spaceId: string
  roomSelected?: number
  className?: string
  setRoomSelected: (id: number) => void
}

const RoomChildList: FC<RoomChildListProps> = ({
  spaceId,
  roomSelected,
  setRoomSelected,
  className,
}) => {
  const {childRooms} = useSpaceRooms(spaceId)
  const {setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {childRooms.map(childRoom => (
        <Room
          key={childRoom.roomId}
          id={childRoom.id}
          isSelected={roomSelected === childRoom.id}
          roomName={childRoom.roomName}
          tagEmoji={emojiRandom()}
          roomId={childRoom.roomId}
          onRoomClick={() => {
            setActiveRoomId(childRoom.roomId)
            setRoomSelected(childRoom.id)
          }}
        />
      ))}
    </div>
  )
}

export default memo(RoomChildList)
