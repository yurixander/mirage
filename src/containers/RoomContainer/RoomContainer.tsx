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

const RoomContainer: FC = () => {
  const {activeRoomId, roomState} = useActiveRoom()
  const [isRosterExpanded, setIsRosterExpanded] = useState(true)

  const {groupedMembers, isMembersLoading, onReloadMembers} =
    useRoomMembers(activeRoomId)

  return (
    <div
      className="flex size-full flex-col"
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
              onUserClick={function (userId: string): void {
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

      <SmartActionBar className="flex size-full max-h-4 items-center justify-end gap-4 border-t border-t-stone-200 bg-neutral-50 p-1 pr-2" />
    </div>
  )
}

export default RoomContainer
