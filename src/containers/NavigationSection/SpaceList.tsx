import {useState, type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {emojiRandom} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import IconButton from "@/components/IconButton"
import {IoEllipsisHorizontal} from "react-icons/io5"
import {
  SidebarModals,
  useSidebarModalActiveStore,
} from "./hooks/useSidebarActions"
import Typography from "@/components/Typography"
import Room from "@/components/Room"

export type PartialRoom = {
  id: number
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()
  const {setActiveSidebarModal} = useSidebarModalActiveStore()

  return (
    <div
      className={twMerge(
        "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
        className
      )}>
      {spaces.length > 0 ? (
        <>
          <Details
            title="All rooms"
            onMoreActionsClick={function (): void {
              // TODO: Add `Reload Space Rooms` for this `Context Menu`.

              setActiveSidebarModal(SidebarModals.CreateRoom)
            }}>
            <div className="flex flex-col gap-1">
              {allRooms.map((room, index) => (
                <Room
                  key={index}
                  roomName={room.roomName}
                  tagEmoji={emojiRandom()}
                  isSelected={roomSelectedId === room.id}
                  onRoomClick={() => {
                    setActiveRoomId(room.roomId)
                    setRoomSelectedId(room.id)
                  }}
                />
              ))}
            </div>
          </Details>

          {spaces.map(space => (
            <Details
              title={space.name}
              key={space.spaceId}
              onMoreActionsClick={() => {
                setActiveSidebarModal(SidebarModals.CreateSpace)
              }}>
              <RoomChildList
                spaceId={space.spaceId}
                roomSelected={roomSelectedId}
                setRoomSelected={setRoomSelectedId}
              />
            </Details>
          ))}
        </>
      ) : (
        <Loader text="Loading Spaces..." />
      )}
    </div>
  )
}

type DetailsProps = {
  title: string
  children?: React.ReactNode
  onMoreActionsClick?: () => void
}

const Details: FC<DetailsProps> = ({title, children, onMoreActionsClick}) => {
  return (
    <details className="cursor-pointer">
      <summary className="flex gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        {onMoreActionsClick !== undefined && (
          <IconButton
            className="ml-auto"
            onClick={onMoreActionsClick}
            size={14}
            iconClassName="text-slate-500"
            tooltip="More actions"
            Icon={IoEllipsisHorizontal}
          />
        )}
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default SpaceList
