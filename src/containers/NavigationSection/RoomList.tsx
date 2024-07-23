import Detail from "@/components/Detail"
import Room, {RoomType} from "@/components/Room"
import useSpaceHierarchy from "@/hooks/matrix/useSpaceHierarchy"
import {useMemo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import LoadingEffect from "@/components/LoadingEffect"
import Typography, {TypographyVariant} from "@/components/Typography"
import {buildDirectRoomsMenuItems, buildRoomsMenuItems} from "@/utils/menu"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"

export type RoomListProps = {
  spaceId?: string
  className?: string
}

const RoomList: FC<RoomListProps> = ({spaceId, className}) => {
  const {rooms, isLoading} = useSpaceHierarchy(spaceId)
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const {setActiveModal} = useActiveModalStore()

  const directRooms = useMemo(
    () => rooms.filter(room => room.type === RoomType.Direct),
    [rooms]
  )

  const groupRooms = useMemo(
    () => rooms.filter(room => room.type === RoomType.Group),
    [rooms]
  )

  return (
    <div
      id="room-list"
      className={twMerge(
        "flex flex-col overflow-y-scroll scrollbar-hide",
        className
      )}>
      <div className="flex flex-col gap-4 p-3">
        <Detail
          title="Direct chats"
          id="direct-chats-detail"
          menuElements={buildDirectRoomsMenuItems({
            isHome: spaceId === undefined,
            onCreateDirectRoom() {
              setActiveModal(Modals.DirectMessages)
            },
            addRoomToSpace() {},
          })}>
          {isLoading ? (
            <RoomListPlaceHolder length={1} />
          ) : directRooms.length === 0 ? (
            <Typography className="ml-4" variant={TypographyVariant.BodyMedium}>
              You not have direct chats
            </Typography>
          ) : (
            <div className="flex flex-col gap-0.5">
              {directRooms.map(directRoom => (
                <Room
                  key={directRoom.roomId}
                  roomName={directRoom.roomName}
                  roomId={directRoom.roomId}
                  type={directRoom.type}
                  onRoomClick={setActiveRoomId}
                  isSelected={activeRoomId === directRoom.roomId}
                  emoji={directRoom.emoji}
                />
              ))}
            </div>
          )}
        </Detail>

        <Detail
          title="Rooms"
          id="rooms-detail"
          isInitiallyOpen
          menuElements={buildRoomsMenuItems({
            isHome: spaceId === undefined,
            onCreateRoom() {
              setActiveModal(Modals.CreateRoom)
            },
            searchPublicRooms() {},
            searchPublicSpaces() {},
            addRoomToSpace() {},
          })}>
          {isLoading ? (
            <RoomListPlaceHolder />
          ) : groupRooms.length === 0 ? (
            <Typography className="ml-4" variant={TypographyVariant.BodyMedium}>
              You not have rooms
            </Typography>
          ) : (
            <div className="flex flex-col gap-0.5">
              {groupRooms.map(room => (
                <Room
                  key={room.roomId}
                  roomName={room.roomName}
                  roomId={room.roomId}
                  type={room.type}
                  onRoomClick={setActiveRoomId}
                  isSelected={activeRoomId === room.roomId}
                  emoji={room.emoji}
                />
              ))}
            </div>
          )}
        </Detail>
      </div>
    </div>
  )
}

const RoomListPlaceHolder: FC<{length?: number}> = ({length = 2}) => {
  return (
    <div className="ml-2 flex flex-col gap-1">
      {Array.from({length}, (_, index) => (
        <div
          key={index}
          className="h-5 w-32 overflow-hidden rounded-md bg-neutral-200">
          <LoadingEffect />
        </div>
      ))}
    </div>
  )
}

export default RoomList
