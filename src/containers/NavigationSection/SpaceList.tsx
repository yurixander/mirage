import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {emojiRandom, generateUniqueNumber} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import Room from "@/components/Room"
import ContextMenu, {
  CONTEXT_MENU_DELETE,
  useContextMenuStore,
} from "@/components/ContextMenu"
import {Details} from "./Space"

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
  const {showMenu} = useContextMenuStore()

  return (
    <>
      <ContextMenu
        id={999}
        elements={[{...CONTEXT_MENU_DELETE, onClick: () => {}}]}
      />

      <div
        className={twMerge(
          "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
          className
        )}>
        {spaces.length > 0 ? (
          <>
            <Details
              id={generateUniqueNumber()}
              title="All rooms"
              onMoreActionsClick={event => {
                // TODO: Add `Reload Space Rooms` for this `Context Menu`.

                showMenu(999, event)
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
                id={generateUniqueNumber()}
                title={space.name}
                key={space.spaceId}
                onMoreActionsClick={event => {
                  showMenu(999, event)
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
    </>
  )
}

export default SpaceList
