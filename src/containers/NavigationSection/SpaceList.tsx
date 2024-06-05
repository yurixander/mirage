import {useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"
import {emojiRandom, generateUniqueNumber} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import Room from "@/components/Room"
import ContextMenu, {
  CONTEXT_MENU_RELOAD,
  CONTEXT_MENU_SETTINGS,
  type ContextMenuItem,
  useContextMenuStore,
} from "@/components/ContextMenu"
import {Details} from "./Space"
import {IoAddCircle} from "react-icons/io5"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"

export type PartialRoom = {
  id: number
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
}

const SPACE_CONTEXT_MENU_ID = 999

const ALL_ROOMS_CONTEXT_MENU_ID = 998

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces, allRooms} = useSpaces()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [roomSelectedId, setRoomSelectedId] = useState<number>()
  const {showMenu} = useContextMenuStore()
  const {setActiveModal} = useActiveModalStore()

  const CONTEXT_MENU_ADD_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Add room",
    onClick: () => {
      throw new Error("Add room not handled")
    },
  }

  const CONTEXT_MENU_CREATE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Create room",
    onClick: () => {
      setActiveModal(Modals.CreateRoom)
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
    onClick() {
      throw new Error("Reload space not handled")
    },
  }

  const CONTEXT_MENU_SETTINGS_SPACE: ContextMenuItem = {
    ...CONTEXT_MENU_SETTINGS,
    onClick() {
      throw new Error("Go to space settings not handled")
    },
  }

  return (
    <>
      {/* TODO: Add `Reload Space Rooms` for this `Context Menu`. */}
      <ContextMenu
        id={SPACE_CONTEXT_MENU_ID}
        elements={[
          CONTEXT_MENU_ADD_ROOM,
          CONTEXT_MENU_EXPLORE_ROOM,
          CONTEXT_MENU_RELOAD_SPACE,
          CONTEXT_MENU_SETTINGS_SPACE,
        ]}
      />

      <ContextMenu
        id={ALL_ROOMS_CONTEXT_MENU_ID}
        elements={[
          CONTEXT_MENU_CREATE_ROOM,
          CONTEXT_MENU_EXPLORE_ROOM,
          CONTEXT_MENU_RELOAD_SPACE,
        ]}
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
                showMenu(ALL_ROOMS_CONTEXT_MENU_ID, event)
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
