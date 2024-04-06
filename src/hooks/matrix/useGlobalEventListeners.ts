import {
  type MatrixClient,
  type MatrixEvent,
  type Room,
  RoomEvent,
  RoomMemberEvent,
  type RoomState,
} from "matrix-js-sdk"
import useEventListener from "./useEventListener"
import useConnection from "./useConnection"
import {getNotificationsData, saveNotification} from "@/utils/notifications"
import {
  type LocalNotificationData,
  NotificationsSyncState,
  useNotificationsStateStore,
} from "@/components/SidebarActions/useCachedNotifications"
import {UserPowerLevel} from "@/components/RosterUser"
import {assert, CommonAssertion, getImageUrl} from "@/utils/util"
import {useMemo} from "react"
import useActiveRoomIdStore from "./useActiveRoomIdStore"

const useGlobalEventListeners = () => {
  const {client} = useConnection()
  const {onRequestChanges, state} = useNotificationsStateStore()
  const {activeRoomId} = useActiveRoomIdStore()

  const containsUnreadNotifications = useMemo(() => {
    if (state === NotificationsSyncState.Processed) {
      return false
    }

    return getNotificationsData().some(notification => notification.isRead)
  }, [state])

  useEventListener(
    RoomMemberEvent.Membership,
    (event, member, oldMembership) => {
      console.log("Membership", event, member, oldMembership)
    }
  )

  useEventListener(RoomMemberEvent.PowerLevel, (event, member) => {
    if (
      client === null ||
      event.getRoomId() === activeRoomId ||
      member.userId !== client.getUserId()
    ) {
      return
    }

    saveNotification(
      getNotificationFromPowerLevelEvent(
        client,
        event,
        member.powerLevel,
        member.userId
      )
    )
  })

  // useEventListener(RoomStateEvent.Members, (event, state, _member) => {
  //   if (client === null || activeRoomId === state.roomId) {
  //     return
  //   }

  //   console.log(event.getType())

  //   let notification: LocalNotificationData | null = null

  //   switch (event.getType()) {
  //     case EventType.RoomPowerLevels: {
  //       notification = getNotificationFromPowerLevelEvent(
  //         client,
  //         event,
  //         state.roomId
  //       )

  //       break
  //     }
  //     case EventType.RoomMember: {
  //       console.log("Of Members;", _member)
  //       // notification = getNotificationFromMembersEvent(event, client, state)

  //       break
  //     }
  //   }

  //   saveNotification(notification)
  //   onRequestChanges()
  // })

  useEventListener(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    if (toStartOfTimeline) {
      // Ignore past events when starting sync.
      return
    }

    if (room === undefined || client === null) {
      // If there is no room, the event may not be a mention event.
      return
    }

    if (activeRoomId === room.roomId) {
      // If the room is the one that is active, no notification is sent.
      return
    }

    saveNotification(getNotificationFromMentionEvent(client, event, room))
    onRequestChanges()
  })

  return {containsUnreadNotifications}
}

export const getNotificationFromInviteEvent = (
  client: MatrixClient,
  room: Room
): LocalNotificationData | null => {
  return {
    body: "invited you to join this room",
    notificationId: room.roomId,
    notificationTime: Date.now(),
    avatarSenderUrl: getImageUrl(room.getMxcAvatarUrl(), client),
    senderName: room.name,
    isRead: false,
    hasActions: true,
  }
}

const getNotificationFromPowerLevelEvent = (
  client: MatrixClient,
  event: MatrixEvent,
  currentLevels: number,
  userId: string
): LocalNotificationData | null => {
  const isAdmin = currentLevels === UserPowerLevel.Admin
  const isMod = currentLevels === UserPowerLevel.Moderator
  const eventId = event.getId()
  const roomName = client.getRoom(event.getRoomId())?.name

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
  assert(roomName !== undefined, "The room should be exist")

  const previousLevels: number = event.getPrevContent().users[userId] || 0
  const powerLevel = isAdmin ? "Admin" : isMod ? "Moderator" : "Member"
  let body: string | null = null

  if (currentLevels > previousLevels) {
    body = `you have been promoted to ${powerLevel} at ${roomName}`
  } else if (currentLevels < previousLevels) {
    body = `you has demoted you to ${powerLevel} at ${roomName}`
  }

  // If the body is null then the power levels event did not occur or was not processed by the room.
  if (body === null) {
    return null
  }

  return {
    body,
    isRead: false,
    notificationId: eventId,
    notificationTime: event.localTimestamp,
    avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
    senderName: event.sender?.name,
  }
}

// TODO: If the room is encrypted, you will have to decrypt the message first.
const getNotificationFromMentionEvent = (
  client: MatrixClient,
  event: MatrixEvent,
  room: Room
): LocalNotificationData | null => {
  const eventId = event.getId()

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  if (!event.getContent()["m.mentions"]?.user_ids?.includes(room.myUserId)) {
    // If there are no mentions there is no mention event.
    return null
  }

  return {
    body: `mentioned you in room: ${room.name}`,
    isRead: false,
    notificationId: eventId,
    notificationTime: event.localTimestamp,
    avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
    senderName: event.sender?.name,
  }
}

const getNotificationFromMembersEvent = (
  event: MatrixEvent,
  client: MatrixClient,
  state: RoomState
): LocalNotificationData | null => {
  const eventId = event.getId()
  const myUserId = client.getUserId()
  const sender = event.getSender()
  const prevContent = event.getPrevContent()
  const room = client.getRoom(event.getRoomId())
  const roomName = room?.name ?? "room"
  const hasReason = event.getContent().reason
  const reason = hasReason === undefined ? "" : `for <<${hasReason}>>`

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  const userId = client.getUserId()

  assert(userId !== null, CommonAssertion.UserIdNotFound)

  const member = state.getMember(userId)

  switch (event.getContent().membership) {
    case "leave": {
      if (sender === myUserId && prevContent.membership === "invite") {
        return {
          body: "you rejected the invitation",
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: room?.name,
          avatarSenderUrl: getImageUrl(room?.getMxcAvatarUrl(), client),
        }
      } else if (sender !== myUserId && prevContent.membership === "join") {
        return {
          body: `expelled you from the ${roomName} ${reason}`,
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: event.sender?.name,
          avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
        }
      }

      break
    }
    case "join": {
      if (prevContent.membership === "invite") {
        return {
          body: `you accepted the invitation to join this room`,
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: room?.name,
          avatarSenderUrl: getImageUrl(room?.getMxcAvatarUrl(), client),
        }
      }
      break
    }
    case "ban": {
      return {
        body: `you have been banned from the ${roomName} ${reason}`,
        isRead: false,
        notificationId: eventId,
        notificationTime: event.localTimestamp,
        senderName: event.sender?.name,
        avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
      }
    }
    case undefined: {
      break
    }
  }

  // The user ban was removed.

  if (member?.membership !== "ban" && prevContent.membership === "ban") {
    return {
      body: `your ban has been lifted in the ${roomName}`,
      isRead: false,
      notificationId: eventId,
      notificationTime: event.localTimestamp,
      senderName: event.sender?.name,
      avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
    }
  }

  return null
}

export default useGlobalEventListeners
