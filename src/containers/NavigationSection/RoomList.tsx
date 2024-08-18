import Detail from "@/components/Detail"
import Room, {RoomType} from "@/components/Room"
import useSpaceHierarchy, {
  type PartialRoom,
  RoomsState,
} from "@/hooks/matrix/useSpaceHierarchy"
import {useMemo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import LoadingEffect from "@/components/LoadingEffect"
import Typography, {TypographyVariant} from "@/components/Typography"
import {buildDirectRoomsMenuItems, buildRoomsMenuItems} from "@/utils/menu"
import useActiveModalStore, {
  ModalRenderLocation,
  Modals,
} from "@/hooks/util/useActiveModal"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import Button, {ButtonVariant} from "@/components/Button"
import {motion} from "framer-motion"

export type RoomListProps = {
  onSpaceSelected: (spaceId?: string) => void
  spaceId?: string
  className?: string
}

const RoomList: FC<RoomListProps> = ({onSpaceSelected, spaceId, className}) => {
  const {rooms, roomsState, onRefreshRooms, client} = useSpaceHierarchy(spaceId)
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
      id={ModalRenderLocation.RoomList}
      className={twMerge(
        "flex flex-col overflow-y-scroll scrollbar-hide",
        className
      )}>
      {roomsState === RoomsState.Error ? (
        <div className="flex size-full flex-col items-center justify-center gap-2">
          <Typography>Rooms loading error</Typography>

          <div className="flex gap-1">
            <Button
              label="Go to home"
              onClick={() => {
                onSpaceSelected()
              }}
            />

            <Button
              isDisabled={client === null}
              variant={ButtonVariant.Primary}
              onClick={onRefreshRooms}
              label="Refresh"
            />
          </div>
        </div>
      ) : (
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
            <RoomListHandler
              rooms={directRooms}
              roomsState={roomsState}
              onRoomClick={setActiveRoomId}
              activeRoomId={activeRoomId}
            />
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
            <RoomListHandler
              rooms={groupRooms}
              roomsState={roomsState}
              onRoomClick={setActiveRoomId}
              activeRoomId={activeRoomId}
            />
          </Detail>
        </div>
      )}
    </div>
  )
}

type RoomListHandlerProps = {
  rooms: PartialRoom[]
  roomsState: RoomsState
  onRoomClick: (roomId: string) => void
  activeRoomId: string | null
}

const RoomListHandler: FC<RoomListHandlerProps> = ({
  rooms,
  roomsState,
  activeRoomId,
  onRoomClick,
}) => {
  return roomsState === RoomsState.Loading ? (
    <RoomListPlaceHolder />
  ) : rooms.length === 0 ? (
    <Typography className="ml-4" variant={TypographyVariant.BodyMedium}>
      You not have rooms
    </Typography>
  ) : (
    <div className="flex flex-col gap-0.5">
      {rooms.map(room => (
        <Room
          key={room.roomId}
          roomName={room.roomName}
          roomId={room.roomId}
          type={room.type}
          onRoomClick={onRoomClick}
          isSelected={activeRoomId === room.roomId}
          emoji={room.emoji}
        />
      ))}
    </div>
  )
}

const RoomListPlaceHolder: FC<{length?: number}> = ({length = 2}) => {
  return (
    <motion.div
      initial={{scale: 0}}
      animate={{scale: 1}}
      className="ml-2 flex flex-col gap-1">
      {Array.from({length}, (_, index) => (
        <div
          key={index}
          className="h-5 w-32 overflow-hidden rounded-md bg-neutral-200">
          <LoadingEffect />
        </div>
      ))}
    </motion.div>
  )
}

export default RoomList
