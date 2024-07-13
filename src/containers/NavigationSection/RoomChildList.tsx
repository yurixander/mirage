import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import useSpaceRooms from "./hooks/useSpaceRooms"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import Room from "@/components/Room"
import LoadingEffect from "@/components/LoadingEffect"

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
      <ChildListPlaceholder />
    </div>
  )
}

const ChildListPlaceholder: FC = () => {
  const itemsCount = Array.from(
    {length: 2},
    (_, number) => (number + 1) * 20 + 60
  )

  return (
    <div className="flex flex-col gap-1">
      {itemsCount.map(item => (
        <div
          key={item}
          className="ml-3 h-5 w-20 overflow-hidden rounded-md bg-neutral-300"
          style={{width: `${item}px`}}>
          <LoadingEffect />
        </div>
      ))}
    </div>
  )
}

export default RoomChildList
