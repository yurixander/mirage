import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {SpaceDetail} from "./SpaceDetail"
import AllRooms from "./AllRooms"
import {IoAddCircle, IoSearchCircle} from "react-icons/io5"
import {type ContextMenuItem} from "@/components/ContextMenu"
import {IoMdLogOut} from "react-icons/io"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, onSpaceExit} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()
  const {setActiveModal} = useActiveModalStore()

  const CONTEXT_MENU_EXPLORE_ROOM: ContextMenuItem = {
    icon: IoSearchCircle,
    text: "Explore rooms",
    onClick: () => {},
  }

  const CONTEXT_MENU_CREATE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create room",
    onClick: () => {
      setActiveModal(Modals.CreateRoom)
    },
  }

  const CONTEXT_MENU_CREATE_SPACE: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create space",
    onClick: () => {
      setActiveModal(Modals.CreateSpace)
    },
  }

  return (
    <>
      <div
        className={twMerge(
          "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth",
          className
        )}>
        {spaces.length > 0 ? (
          <>
            {spaces.map(space => (
              <SpaceDetail
                spaceId={space.spaceId}
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
