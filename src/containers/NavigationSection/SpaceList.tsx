import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {generateUniqueNumber} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {Space} from "./Space"
import AllRooms from "./AllRooms"

export type PartialRoom = {
  id: number
  roomId: string
  roomName: string
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()

  return (
    <>
      <div
        className={twMerge(
          "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
          className
        )}>
        {spaces.length > 0 ? (
          <>
            <AllRooms
              rooms={allRooms}
              onRoomClick={setActiveRoomId}
              roomSelectedId={roomSelectedId}
            />

            {spaces.map(space => (
              <Space
                id={generateUniqueNumber()}
                title={space.name}
                key={space.spaceId}>
                <RoomChildList
                  spaceId={space.spaceId}
                  roomSelected={roomSelectedId}
                  setRoomSelected={setRoomSelectedId}
                />
              </Space>
            ))}
          </>
        ) : (
          <Loader text="Loading Spaces..." />
        )}
      </div>
    </>
  )
}

export default SpaceList
