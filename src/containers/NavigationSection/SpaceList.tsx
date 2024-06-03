import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {generateUniqueNumber} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import ContextMenu, {
  ClickActions,
  useContextMenuStore,
} from "@/components/ContextMenu"
import {Details} from "./Space"
import {IoEllipsisHorizontal} from "react-icons/io5"
import IconButton from "@/components/IconButton"
import AllRooms from "./AllRooms"

export type PartialRoom = {
  id: number
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
}

const SPACE_CONTEXT_MENU_ID = 998

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()
  const {showMenu} = useContextMenuStore()

  return (
    <>
      {/* TODO: Add `Reload Space Rooms` for this `Context Menu`. */}
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
              onReloadRooms={function (): void {
                throw new Error("Function not implemented.")
              }}
            />

            {spaces.map(space => (
              <Details
                id={generateUniqueNumber()}
                title={space.name}
                key={space.spaceId}
                rightAction={
                  <ContextMenu
                    id={SPACE_CONTEXT_MENU_ID}
                    elements={[]}
                    actionType={ClickActions.LeftClick}>
                    <IconButton
                      onClick={event => {
                        showMenu(SPACE_CONTEXT_MENU_ID, event)
                      }}
                      size={14}
                      iconClassName="text-slate-500"
                      tooltip="More actions"
                      Icon={IoEllipsisHorizontal}
                    />
                  </ContextMenu>
                }>
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
