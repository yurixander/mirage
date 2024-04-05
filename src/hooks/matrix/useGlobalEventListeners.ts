import {
  EventType,
  type MatrixClient,
  type MatrixEvent,
  type Room,
  RoomEvent,
  type RoomState,
  RoomStateEvent,
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

const useGlobalEventListeners = () => {
  const {client} = useConnection()
  const {onRequestChanges, state} = useNotificationsStateStore()

  const containsUnreadNotifications = useMemo(() => {
    if (state === NotificationsSyncState.Processed) {
      return false
    }

    return getNotificationsData().some(notification => notification.isRead)
  }, [state])

  useEventListener(RoomStateEvent.Events, (event, state) => {
    if (event.getType() === EventType.RoomMember) {
      if (client === null) {
        return
      }

      saveNotification(getNotificationFromMembersEvent(event, client, state))
      onRequestChanges()
    }

    // TODO: Handle here power level events.
    if (event.getType() !== EventType.RoomPowerLevels || client === null) {
      return
    }

    // Handle power levels event for notifications.
    saveNotification(
      getNotificationFromPowerLevelEvent(client, event, state.roomId)
    )

    onRequestChanges()
  })

  useEventListener(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    if (toStartOfTimeline) {
      // Ignore past events when starting sync.
      return
    }

    if (room === undefined || client === null) {
      // If there is no room, the event may not be a mention event.
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
  roomId: string
): LocalNotificationData | null => {
  const eventId = event.getId()
  const userId = client.getUserId()
  const roomName = client.getRoom(roomId)?.name
  let powerLevel: string = "Member"
  let body: string | null = null

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
  assert(userId !== null, "If userId is undefined, client is not initialized")
  assert(roomName !== undefined, "The room must exist")

  const currentLevels: number = event.getContent().users[userId]
  const previousLevels: number = event.getPrevContent().users[userId] || 0

  if (currentLevels === UserPowerLevel.Admin) {
    powerLevel = "Admin"
  } else if (
    currentLevels >= UserPowerLevel.Moderator &&
    currentLevels < UserPowerLevel.Admin
  ) {
    powerLevel = "Moderator"
  }

  if (currentLevels > previousLevels) {
    body = `you have been promoted to ${powerLevel} at ${roomName}`
  } else if (currentLevels < previousLevels) {
    body = `you has demoted you to ${powerLevel} at ${roomName}`
  }

  if (body === null) {
    // If the body is null then the power levels event did not occur or was not processed by the room.
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

const getNotificationFromMentionEvent = (
  client: MatrixClient,
  event: MatrixEvent,
  room: Room
): LocalNotificationData | null => {
  const eventId = event.getId()

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  if (!event.getContent()["m.mentions"]?.user_ids?.includes(room.myUserId)) {
    // TODO: If the room is encrypted, you will have to decrypt the message first.
    throw new Error("Not yet implemented")
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
