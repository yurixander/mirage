import {
  type MatrixClient,
  type MatrixEvent,
  type Room,
  RoomEvent,
  type RoomMember,
  RoomMemberEvent,
} from "matrix-js-sdk"
import useEventListener from "./useEventListener"
import useConnection from "./useConnection"
import {
  getNotificationsData,
  saveNotification,
} from "@/containers/SidebarActions/hooks/notifications"
import {
  type LocalNotificationData,
  NotificationsSyncState,
  useNotificationsStateStore,
} from "@/containers/SidebarActions/hooks/useCachedNotifications"
import {UserPowerLevel} from "@/components/RosterUser"
import {assert, CommonAssertion, getImageUrl} from "@/utils/util"
import {useMemo} from "react"
import useActiveRoomIdStore from "./useActiveRoomIdStore"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

const useGlobalEventListeners = () => {
  const {client} = useConnection()
  const {onRequestChanges, state} = useNotificationsStateStore()
  const {activeRoomId} = useActiveRoomIdStore()

  const containsUnreadNotifications = useMemo(() => {
    if (state === NotificationsSyncState.Processed) {
      return false
    }

    return getNotificationsData().some(notification => !notification.isRead)
  }, [state])

  useEventListener(
    RoomMemberEvent.Membership,
    (event, member, oldMembership) => {
      if (
        client === null ||
        event.getRoomId() === activeRoomId ||
        member.userId !== client.getUserId()
      ) {
        return
      }

      saveNotification(
        getNotificationFromMembersEvent(event, client, member, oldMembership)
      )

      onRequestChanges()
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

    onRequestChanges()
  })

  useEventListener(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    // Ignore past events when starting sync.
    if (toStartOfTimeline) {
      return
    }

    // If there is no room, the event may not be a mention event.
    if (room === undefined || client === null) {
      return
    }

    // If the room is the one that is active, no notification is sent.
    if (activeRoomId === room.roomId) {
      return
    }

    saveNotification(getNotificationFromMentionEvent(client, event, room))
    onRequestChanges()
  })

  return {containsUnreadNotifications}
}

export const getNotificationFromInviteEvent = (
  roomId: string,
  roomName: string,
  roomAvatarUrl?: string
): LocalNotificationData | null => {
  return {
    body: "invited you to join this room",
    notificationId: roomId,
    notificationTime: Date.now(),
    avatarSenderUrl: roomAvatarUrl,
    senderName: roomName,
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
  const prevContent = event.getPrevContent()

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
  assert(roomName !== undefined, "The room should be exist")

  // If it does not have users, is a Room in creation, it cannot be processed.
  if (prevContent.users === undefined) {
    return null
  }

  const previousLevels: number = prevContent.users[userId] ?? 0
  const powerLevel = isAdmin ? "Admin" : isMod ? "Moderator" : "Member"
  let body: string | null = null

  if (currentLevels > previousLevels) {
    body = `you have been promoted to ${powerLevel} at ${roomName}`
  } else if (currentLevels < previousLevels) {
    body = `you have been demoted to ${powerLevel} at ${roomName}`
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

  // If there are no mentions there is no mention event.
  if (!event.getContent()["m.mentions"]?.user_ids?.includes(room.myUserId)) {
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
  member: RoomMember,
  oldMembership?: string
): LocalNotificationData | null => {
  const eventId = event.getId()
  const sender = event.getSender()
  const room = client.getRoom(member.roomId)
  const hasReason = event.getContent().reason
  const reason = hasReason === undefined ? "" : `for <<${hasReason}>>`

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  // A null room in this case is a room that is being created and the notification should not be processed.
  if (room === null) {
    return null
  }

  switch (member.membership) {
    case KnownMembership.Invite: {
      saveNotification(
        getNotificationFromInviteEvent(
          room.roomId,
          room.name,
          getImageUrl(room.getMxcAvatarUrl(), client)
        )
      )

      break
    }
    case KnownMembership.Leave: {
      if (
        sender === member.userId &&
        oldMembership === KnownMembership.Invite
      ) {
        return {
          body: "you rejected the invitation",
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: room?.name,
          avatarSenderUrl: getImageUrl(room?.getMxcAvatarUrl(), client),
        }
      } else if (
        sender !== member.userId &&
        oldMembership === KnownMembership.Join
      ) {
        return {
          body: `expelled you from the ${room.name} ${reason}`,
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: event.sender?.name,
          avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
        }
      }

      break
    }
    case KnownMembership.Ban: {
      return {
        body: `you have been banned from the ${room.name} ${reason}`,
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
  if (
    member.membership !== KnownMembership.Ban &&
    oldMembership === KnownMembership.Ban
  ) {
    return {
      body: `your ban has been lifted in the ${room.name}`,
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
