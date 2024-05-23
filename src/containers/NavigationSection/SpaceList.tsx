import {type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import Room from "./Room"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

export type PartialRoom = {
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms} = useSpaces()
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div
      className={twMerge(
        "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
        className
      )}>
      {spaces.length > 0 ? (
        <>
          <Details title="All rooms">
            {allRooms.map(room => (
              <Room
                roomName={room.roomName}
                tagEmoji={emojiRandom()}
                roomId={room.roomId}
                isSelected={activeRoomId === room.roomId}
                onRoomClick={setActiveRoomId}
              />
            ))}
          </Details>

          {spaces.map(space => (
            <Details title={space.name} key={space.spaceId}>
              <RoomChildList spaceId={space.spaceId} />
            </Details>
          ))}
        </>
      ) : (
        <Loader text="Charging Spaces..." />
      )}
    </div>
  )
}

const Details: FC<{title: string; children?: React.ReactNode}> = ({
  title,
  children,
}) => {
  return (
    <details className="cursor-pointer">
      <summary className="text-sm font-bold text-slate-500">
        {title.toUpperCase()}
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default SpaceList
