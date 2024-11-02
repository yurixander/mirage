import {useState, type FC} from "react"
import ChatContainer from "./ChatContainer"
import Roster from "../Roster/Roster"
import SmartActionBar from "@/components/SmartActionBar"
import WelcomeSplash from "./WelcomeSplash"
import RoomNotFoundSplash from "./RoomNotFoundSplash"
import RoomInvitedSplash from "./RoomInvitedSplash"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"
import useActiveRoom, {RoomState} from "./hooks/useActiveRoom"
import {motion} from "framer-motion"
import useRoomMembers from "../Roster/hooks/useRoomMembers"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import useBreakpoint from "@/hooks/util/useMediaQuery"

const RoomContainer: FC = () => {
  const {activeRoomId, roomState} = useActiveRoom()
  const [isRosterExpanded, setIsRosterExpanded] = useState(true)
  const {isSmall} = useBreakpoint()

  const {groupedMembers, isMembersLoading, onReloadMembers} =
    useRoomMembers(activeRoomId)

  useGlobalHotkey({key: "M", ctrl: true}, () => {
    setIsRosterExpanded(prevIsExpanded => !prevIsExpanded)
  })

  if (!isSmall && activeRoomId === null) {
    return <></>
  }

  return (
    <div
      className="size-full flex-col sm:flex"
      id={ModalRenderLocation.RoomContainer}>
      {(roomState === RoomState.Joined || roomState === RoomState.Invited) &&
      activeRoomId !== null ? (
        <div className="flex size-full">
          {roomState === RoomState.Invited ? (
            <RoomInvitedSplash roomId={activeRoomId} />
          ) : (
            <ChatContainer
              className="flex size-full flex-col"
              roomId={activeRoomId}
              isRosterExpanded={isRosterExpanded}
              onRosterExpanded={setIsRosterExpanded}
            />
          )}

          <motion.div animate={{width: isRosterExpanded ? "15rem" : 0}}>
            <Roster
              className="max-w-60"
              groupedMembers={groupedMembers}
              isLoading={isMembersLoading}
              onReloadMembers={onReloadMembers}
              onUserClick={function (_userId: string): void {
                throw new Error("`onUserClick` function not implemented.")
              }}
            />
          </motion.div>
        </div>
      ) : roomState === RoomState.NotFound ? (
        <RoomNotFoundSplash />
      ) : (
        <WelcomeSplash />
      )}

      <SmartActionBar />
    </div>
  )
}

export default RoomContainer
