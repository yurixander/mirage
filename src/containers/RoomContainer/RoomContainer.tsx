import SmartActionBar from "@/components/SmartActionBar"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"
import {motion} from "framer-motion"
import {type FC, useState} from "react"
import Roster from "../Roster/Roster"
import useRoomMembers from "../Roster/hooks/useRoomMembers"
import ChatContainer from "./ChatContainer"
import RoomInvitedSplash from "./RoomInvitedSplash"
import RoomNotFoundSplash from "./RoomNotFoundSplash"
import WelcomeSplash from "./WelcomeSplash"
import useActiveRoom, {RoomState} from "./hooks/useActiveRoom"

const RoomContainer: FC = () => {
  const {activeRoomId, roomState} = useActiveRoom()
  const [isRosterExpanded, setIsRosterExpanded] = useState(true)

  const {groupedMembers, isMembersLoading, onReloadMembers} =
    useRoomMembers(activeRoomId)

  return (
    <div
      className="hidden size-full flex-col sm:flex"
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

          <motion.div animate={{width: isRosterExpanded ? 250 : 0}}>
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
