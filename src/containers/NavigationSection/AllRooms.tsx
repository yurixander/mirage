import {type FC} from "react"
import {type PartialRoom} from "./SpaceList"
import {emojiRandom, generateUniqueNumber} from "@/utils/util"
import {Details} from "./Space"
import Room from "@/components/Room"
import IconButton from "@/components/IconButton"
import {IoAddCircle, IoEllipsisHorizontal} from "react-icons/io5"
import ContextMenu, {
  ClickActions,
  CONTEXT_MENU_RELOAD,
  type ContextMenuItem,
  useContextMenuStore,
} from "@/components/ContextMenu"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {
  SidebarModals,
  useSidebarModalActiveStore,
} from "./hooks/useSidebarActions"

const ALL_ROOMS_CONTEXT_MENU_ID = 994

export type AllRoomsProps = {
  rooms: PartialRoom[]
  onRoomClick: (roomId: string) => void
  onReloadRooms: () => void
}

const AllRooms: FC<AllRoomsProps> = ({rooms, onRoomClick, onReloadRooms}) => {
  const {showMenu} = useContextMenuStore()
  const {activeRoomId} = useActiveRoomIdStore()
  const {setActiveSidebarModal} = useSidebarModalActiveStore()

  const CONTEXT_MENU_CREATE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create room",
    onClick: () => {
      setActiveSidebarModal(SidebarModals.CreateRoom)
    },
  }

  const CONTEXT_MENU_EXPLORE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Explore rooms",
    onClick: () => {
      throw new Error("Explore rooms not handled")
    },
  }

  const CONTEXT_MENU_RELOAD_SPACE: ContextMenuItem = {
    ...CONTEXT_MENU_RELOAD,
    onClick: onReloadRooms,
  }

  return (
    <Details
      id={generateUniqueNumber()}
      title="All rooms"
      rightAction={
        <ContextMenu
          id={ALL_ROOMS_CONTEXT_MENU_ID}
          actionType={ClickActions.LeftClick}
          elements={[
            CONTEXT_MENU_CREATE_ROOM,
            CONTEXT_MENU_EXPLORE_ROOM,
            CONTEXT_MENU_RELOAD_SPACE,
          ]}>
          <IconButton
            onClick={event => {
              showMenu(ALL_ROOMS_CONTEXT_MENU_ID, event)
            }}
            size={14}
            iconClassName="text-slate-500"
            tooltip="More actions"
            Icon={IoEllipsisHorizontal}
          />
        </ContextMenu>
      }>
      <div className="flex flex-col gap-1">
        {rooms.map((room, index) => (
          <Room
            key={index}
            roomName={room.roomName}
            tagEmoji={emojiRandom()}
            isSelected={activeRoomId === room.roomId}
            onRoomClick={() => {
              onRoomClick(room.roomId)
            }}
          />
        ))}
      </div>
    </Details>
  )
}

export default AllRooms
