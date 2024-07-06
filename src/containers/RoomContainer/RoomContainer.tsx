import {type FC} from "react"
import ChatContainer from "./ChatContainer"
import Roster from "../Roster/Roster"
import SmartActionBar from "@/components/SmartActionBar"
import WelcomeSplash from "../ChatContainer/WelcomeSplash"
import RoomNotFoundSplash from "../ChatContainer/RoomNotFoundSplash"
import useActiveRoom, {RoomState} from "@/hooks/matrix/useActiveRoom"
import RoomInvitedSplash from "../ChatContainer/RoomInvitedSplash"

const RoomContainer: FC = () => {
  const {activeRoomId, roomState} = useActiveRoom()

  return (
    <div className="flex size-full flex-col">
      {(roomState === RoomState.Joined || roomState === RoomState.Invited) &&
      activeRoomId !== null ? (
        <div className="flex size-full">
          {roomState === RoomState.Invited ? (
            <RoomInvitedSplash roomId={activeRoomId} />
          ) : (
            <ChatContainer
              className="flex size-full flex-col"
              roomId={activeRoomId}
            />
          )}

          <Roster
            className="flex size-full max-w-52 flex-col border border-l-slate-300 bg-gray-50"
            roomId={activeRoomId}
          />
        </div>
      ) : roomState === RoomState.Idle ? (
        <WelcomeSplash />
      ) : (
        <RoomNotFoundSplash />
      )}

      <SmartActionBar className="flex size-full max-h-4 items-center justify-end gap-4 border-t border-t-stone-200 bg-neutral-50 p-1 pr-2" />
    </div>
  )
}

export default RoomContainer
