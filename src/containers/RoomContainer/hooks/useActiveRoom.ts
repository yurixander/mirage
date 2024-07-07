import useConnection from "@/hooks/matrix/useConnection"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {useEffect, useState} from "react"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {RoomMemberEvent} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"

export enum RoomState {
  Idle,
  Invited,
  Joined,
  NotFound,
}

const useActiveRoom = () => {
  const {client} = useConnection()
  const [roomState, setRoomState] = useState(RoomState.Idle)
  const {activeRoomId, clearActiveRoomId} = useActiveRoomIdStore()

  useEffect(() => {
    if (client === null || activeRoomId === null) {
      return
    }

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      setRoomState(RoomState.NotFound)

      return
    }

    const membership = room.getMyMembership()

    setRoomState(() => {
      if (
        membership !== KnownMembership.Join &&
        membership !== KnownMembership.Invite
      ) {
        return RoomState.NotFound
      }

      return membership === KnownMembership.Join
        ? RoomState.Joined
        : RoomState.Invited
    })
  }, [activeRoomId, client])

  // const {openFilePicker, filesContent, clear} = useFilePicker({
  //   accept: "image/*",
  //   multiple: false,
  //   readAs: "DataURL",
  // })

  // const imagePreviewProps = useMemo(() => {
  //   if (filesContent.length <= 0) {
  //     return
  //   }

  //   const imageModalPreviewProps: ImageModalPreviewProps = {
  //     imageName: filesContent[0].name,
  //     imageUrl: filesContent[0].content,
  //     onClear: clear,
  //     onSendImage() {
  //       void sendImageMessageFromFile(
  //         filesContent[0],
  //         client,
  //         activeRoomId
  //       ).then(() => {
  //         clear()
  //       })
  //     },
  //   }

  //   return imageModalPreviewProps
  // }, [activeRoomId, clear, client, filesContent])

  useEventListener(RoomMemberEvent.Membership, (_, member) => {
    if (
      client === null ||
      member.userId !== client.getUserId() ||
      activeRoomId !== member.roomId
    ) {
      return
    }

    // If you are kicked out of the room, update the UI so that you cannot access the room.
    if (
      member.membership !== KnownMembership.Join &&
      member.membership !== KnownMembership.Invite
    ) {
      setRoomState(RoomState.NotFound)
      clearActiveRoomId()

      return
    }

    setRoomState(
      member.membership === KnownMembership.Join
        ? RoomState.Joined
        : RoomState.Invited
    )
  })

  return {
    client,
    roomState,
    activeRoomId,
  }
}

export default useActiveRoom
