import {type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {emojiRandom} from "@/utils/util"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import Room from "./Room"

export type PartialRoom = {
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
  childRooms: PartialRoom[]
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces} = useSpaces()
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div
      className={twMerge(
        "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
        className
      )}>
      {spaces.length > 0 ? (
        spaces.map(space => (
          <Details title={space.name} key={space.spaceId}>
            <div className="flex flex-col gap-1">
              {space.childRooms.map(room => (
                <Room
                  key={room.roomId}
                  roomName={room.roomName}
                  tagEmoji={emojiRandom()}
                  roomId={room.roomId}
                  isSelected={activeRoomId === room.roomId}
                  onRoomClick={setActiveRoomId}
                />
              ))}
            </div>
          </Details>
        ))
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
