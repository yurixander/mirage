import {useEffect, useState, type FC} from "react"
import ChatContainer from "./ChatContainer"
import Roster from "../Roster/Roster"
import SmartActionBar from "@/components/SmartActionBar"
import {RoomMembershipState} from "@/hooks/matrix/useActiveRoom"
import WelcomeSplash from "../ChatContainer/WelcomeSplash"
import RoomNotFoundSplash from "../ChatContainer/RoomNotFoundSplash"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

const RoomContainer: FC = () => {
  const {activeRoomId} = useActiveRoomIdStore()
  const {client} = useConnection()
  const [roomState, setRoomState] = useState(RoomMembershipState.Idle)

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      setRoomState(RoomMembershipState.NoAccess)

      return
    }

    const membership = room.getMyMembership()

    setRoomState(() => {
      if (
        membership !== KnownMembership.Join &&
        membership !== KnownMembership.Invite
      ) {
        return RoomMembershipState.NoAccess
      }

      return membership === KnownMembership.Join
        ? RoomMembershipState.Joined
        : RoomMembershipState.Invited
    })
  }, [activeRoomId, client])

  return (
    <div className="flex size-full flex-col">
      {(roomState === RoomMembershipState.Joined ||
        roomState === RoomMembershipState.Invited) &&
      activeRoomId !== null ? (
        <div className="flex size-full">
          <ChatContainer
            className="flex size-full max-w-lg flex-col bg-blue-500"
            roomState={roomState}
            roomId={activeRoomId}
          />

          <Roster
            className="flex size-full max-w-xs flex-col border border-l-slate-300 bg-gray-50"
            roomId={activeRoomId}
          />
        </div>
      ) : roomState === RoomMembershipState.Idle && activeRoomId === null ? (
        <WelcomeSplash />
      ) : (
        <RoomNotFoundSplash />
      )}

      <SmartActionBar className="flex size-full max-h-4 items-center justify-end gap-4 border-t border-t-stone-200 bg-neutral-50 p-1 pr-2" />
    </div>
  )
}

export default RoomContainer
