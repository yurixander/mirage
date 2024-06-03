import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import useSpaceRooms from "./hooks/useSpaceRooms"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import Room from "@/components/Room"
import LoadingEffect from "@/components/LoadingEffect"
import Typography, {TypographyVariant} from "@/components/Typography"

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
  const {childRooms, isLoading} = useSpaceRooms(spaceId)
  const {setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {isLoading ? (
        <ChildListPlaceholder />
      ) : (
        childRooms.map(childRoom => (
          <Room
            key={childRoom.roomId}
            isSelected={roomSelected === childRoom.id}
            roomName={childRoom.roomName}
            tagEmoji={emojiRandom()}
            onRoomClick={() => {
              setActiveRoomId(childRoom.roomId)
              setRoomSelected(childRoom.id)
            }}
          />
        ))
      )}
    </div>
  )
}

const ChildListPlaceholder: FC = () => {
  const itemsCount = Array.from({length: 2}, (_, number) => "A".repeat(number))

  return itemsCount.map(item => (
    <div
      key={item}
      className="ml-4 w-max overflow-hidden rounded-md bg-neutral-300 p-1 px-2">
      <Typography variant={TypographyVariant.P} className="text-neutral-300">
        Example 3-5{item}
      </Typography>

      <LoadingEffect />
    </div>
  ))
}

export default RoomChildList
