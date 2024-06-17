// import {
//   type MatrixClient,
//   type MatrixEvent,
//   type Room,
//   RoomEvent,
//   type RoomMember,
//   RoomMemberEvent,
// } from "matrix-js-sdk"
// import useEventListener from "./useEventListener"
// import useConnection from "./useConnection"
// import {getNotificationsData} from "@/utils/notifications"
// import {UserPowerLevel} from "@/containers/Roster/RosterUser"
// import {assert, CommonAssertion, getImageUrl} from "@/utils/util"
// import {useMemo} from "react"
// import useActiveRoomIdStore from "./useActiveRoomIdStore"
// import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

const useGlobalEventListeners = () => {
  // useEventListener(RoomMemberEvent.PowerLevel, (event, member) => {
  //   if (
  //     client === null ||
  //     event.getRoomId() === activeRoomId ||
  //     member.userId !== client.getUserId()
  //   ) {
  //     return
  //   }

  //   saveNotification(
  //     getNotificationFromPowerLevelEvent(
  //       client,
  //       event,
  //       member.powerLevel,
  //       member.userId
  //     )
  //   )

  //   onRequestChanges()
  // })

  return {}
}

// const getNotificationFromPowerLevelEvent = (
//   client: MatrixClient,
//   event: MatrixEvent,
//   currentLevels: number,
//   userId: string
// ): LocalNotificationData | null => {
//   const isAdmin = currentLevels === UserPowerLevel.Admin
//   const isMod = currentLevels === UserPowerLevel.Moderator
//   const eventId = event.getId()
//   const roomName = client.getRoom(event.getRoomId())?.name
//   const prevContent = event.getPrevContent()

//   assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
//   assert(roomName !== undefined, "The room should be exist")

//   // If it does not have users, is a Room in creation, it cannot be processed.
//   if (prevContent.users === undefined) {
//     return null
//   }

//   const previousLevels: number = prevContent.users[userId] ?? 0
//   const powerLevel = isAdmin ? "Admin" : isMod ? "Moderator" : "Member"
//   let body: string | null = null

//   if (currentLevels > previousLevels) {
//     body = `you have been promoted to ${powerLevel} at ${roomName}`
//   } else if (currentLevels < previousLevels) {
//     body = `you have been demoted to ${powerLevel} at ${roomName}`
//   }

//   // If the body is null then the power levels event did not occur or was not processed by the room.
//   if (body === null) {
//     return null
//   }

//   return {
//     body,
//     isRead: false,
//     notificationId: eventId,
//     notificationTime: event.localTimestamp,
//     avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
//     senderName: event.sender?.name,
//   }
// }

export default useGlobalEventListeners
