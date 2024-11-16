import {useState, type FC} from "react"
import ChatContainer from "./ChatContainer"
import Roster from "../Roster/Roster"
import WelcomeSplash from "./WelcomeSplash"
import RoomNotFoundSplash from "./RoomNotFoundSplash"
import useActiveRoom, {RoomState} from "./hooks/useActiveRoom"
import {motion} from "framer-motion"
import useRoomMembers from "../Roster/hooks/useRoomMembers"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import useBreakpoint from "@/hooks/util/useMediaQuery"
import RoomInvitedSplash from "./RoomInvitedSplash"
import useInvitedRoom from "@/hooks/matrix/useInvitedRoom"
import SmartActionBar from "@/components/SmartActionBar"

const RoomContainer: FC = () => {
  const [isRosterExpanded, setIsRosterExpanded] = useState(true)
  const {isSmall, isLarge} = useBreakpoint()

  const {activeRoomId, roomState, clearActiveRoomId} = useActiveRoom()
  const {roomInvitedDetail, onJoinRoom} = useInvitedRoom(activeRoomId)

  const {membersState, onReloadMembers, onLazyReload, isLazyLoading} =
    useRoomMembers(activeRoomId)

  useGlobalHotkey({key: "M", ctrl: true}, () => {
    setIsRosterExpanded(prevIsExpanded => !prevIsExpanded)
  })

  if (!isSmall && activeRoomId === null) {
    return <></>
  }

  return (
    <>
      {roomState === RoomState.Invited && (
        <RoomInvitedSplash
          onClose={clearActiveRoomId}
          roomDetailPreview={roomInvitedDetail}
          onJoinRoom={onJoinRoom}
        />
      )}

      <div className="size-full flex-col sm:flex">
        {roomState === RoomState.Joined && activeRoomId !== null ? (
          <div className="flex size-full">
            <ChatContainer
              className="flex size-full flex-col"
              roomId={activeRoomId}
              isRosterExpanded={isRosterExpanded}
              onRosterExpanded={setIsRosterExpanded}
            />

            {isLarge && (
              <motion.div animate={{width: isRosterExpanded ? "15rem" : 0}}>
                <Roster
                  className="max-w-60"
                  isLazyLoading={isLazyLoading}
                  membersState={membersState}
                  onReloadMembers={onReloadMembers}
                  onLazyLoad={onLazyReload}
                  onUserClick={function (_userId: string): void {
                    throw new Error("`onUserClick` function not implemented.")
                  }}
                />
              </motion.div>
            )}
          </div>
        ) : roomState === RoomState.NotFound ? (
          <RoomNotFoundSplash />
        ) : (
          <WelcomeSplash />
        )}

        <SmartActionBar />
      </div>
    </>
  )
}

export default RoomContainer
