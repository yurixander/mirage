import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {generateUniqueNumber} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {SpaceDetail} from "./SpaceDetail"
import AllRooms from "./AllRooms"
import {IoAddCircle, IoSearchCircle} from "react-icons/io5"
import {type ContextMenuItem} from "@/components/ContextMenu"
import {
  SidebarModals,
  useSidebarModalActiveStore,
} from "./hooks/useSidebarActions"
import {IoMdLogOut} from "react-icons/io"

export type PartialRoom = {
  id: number
  roomId: string
  roomName: string
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms, onSpaceExit} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()
  const {setActiveSidebarModal} = useSidebarModalActiveStore()

  const CONTEXT_MENU_EXPLORE_ROOM: ContextMenuItem = {
    icon: IoSearchCircle,
    text: "Explore rooms",
    onClick: () => {},
  }

  const CONTEXT_MENU_CREATE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create room",
    onClick: () => {
      setActiveSidebarModal(SidebarModals.CreateRoom)
    },
  }

  const CONTEXT_MENU_CREATE_SPACE: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create space",
    onClick: () => {
      setActiveSidebarModal(SidebarModals.CreateSpace)
    },
  }

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
              onRoomClick={room => {
                setActiveRoomId(room.roomId)
                setRoomSelectedId(room.id)
              }}
              roomSelectedId={roomSelectedId}
            />

            {spaces.map(space => (
              <SpaceDetail
                id={generateUniqueNumber()}
                title={space.name}
                key={space.spaceId}
                menuElements={[
                  CONTEXT_MENU_CREATE_SPACE,
                  CONTEXT_MENU_CREATE_ROOM,
                  CONTEXT_MENU_EXPLORE_ROOM,
                  {
                    icon: IoMdLogOut,
                    text: "Exit",
                    color: "red",
                    onClick() {
                      onSpaceExit(space.spaceId)
                    },
                  },
                ]}>
                <RoomChildList
                  spaceId={space.spaceId}
                  roomSelected={roomSelectedId}
                  setRoomSelected={setRoomSelectedId}
                />
              </SpaceDetail>
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
