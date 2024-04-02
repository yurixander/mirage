import {useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  EventType,
  type MatrixClient,
  type MatrixEvent,
  type Room,
  RoomEvent,
  type RoomMember,
  RoomStateEvent,
} from "matrix-js-sdk"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedNotifications, {
  type LocalNotificationData,
} from "./useCachedNotifications"
import {assert, CommonAssertion, getImageUrl} from "@/utils/util"
import {ButtonVariant} from "../Button"
import {UserPowerLevel} from "../RosterUser"

const useNotifications = () => {
  const {client} = useConnection()
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const {
    cachedNotifications,
    saveNotification,
    deleteNotificationById,
    markAsReadByNotificationId,
  } = useCachedNotifications()

  useEffect(() => {
    if (client === null) {
      return
    }

    // Handle history user notifications.
    const newNotifications: NotificationProps[] = []

    const invitedRooms = client
      .getRooms()
      .filter(room => room.getMyMembership() === "invite")

    for (const invitedRoom of invitedRooms) {
      newNotifications.push({
        body: "invited you to join this room",
        notificationId: invitedRoom.roomId,
        notificationTime: Date.now(),
        avatarSenderUrl: getImageUrl(invitedRoom.getMxcAvatarUrl(), client),
        senderName: invitedRoom.name,
        isRead: false,
        actions: [
          {
            name: "Accept",
            onClick: () => {
              void client.joinRoom(invitedRoom.roomId).then(room => {
                if (room.getMyMembership() === "join") {
                  deleteNotificationById(invitedRoom.roomId)
                }
              })
            },
          },
          {
            name: "Decline",
            onClick: () => {
              void client.leave(invitedRoom.roomId).then(() => {
                deleteNotificationById(invitedRoom.roomId)
              })
            },
            actionVariant: ButtonVariant.TextLink,
          },
        ],
        onDelete: () => {
          deleteNotificationById(invitedRoom.roomId)
        },
        onMarkAsRead() {
          markAsReadByNotificationId(invitedRoom.roomId)
        },
      })
    }

    for (const notification of cachedNotifications) {
      newNotifications.push({
        body: notification.body,
        isRead: notification.isRead,
        notificationTime: notification.notificationTime,
        notificationId: notification.notificationId,
        senderName: notification.senderName,
        avatarSenderUrl: notification.avatarSenderUrl,
        onDelete: () => {
          deleteNotificationById(notification.notificationId)
        },
        onMarkAsRead: () => {
          markAsReadByNotificationId(notification.notificationId)
        },
      })
    }

    setNotifications(newNotifications)
  }, [
    cachedNotifications,
    client,
    deleteNotificationById,
    markAsReadByNotificationId,
  ])

  useEventListener(RoomStateEvent.Events, (event, state) => {
    if (event.getType() !== EventType.RoomPowerLevels || client === null) {
      return
    }

    // Handle power levels event for notifications.
    saveNotification(
      getNotificationFromPowerLevelEvent(client, event, state.roomId)
    )
  })

  useEventListener(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    if (toStartOfTimeline) {
      return // Ignore past events when starting sync.
    }

    if (room === undefined || client === null) {
      return // If there is no room, the event may not be a mention event.
    }

    saveNotification(getNotificationFromMentionEvent(client, event, room))
  })

  useEventListener(RoomStateEvent.Members, (event, _state, member) => {
    if (client === null || client.getUserId() !== member.userId) {
      return
    }

    saveNotification(getNotificationFromMembersEvent(event, client, member))
  })

  return {notifications}
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
  assert(userId !== null, "My userId should not be undefined")
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
  member: RoomMember
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

  if (member.membership !== "ban" && prevContent.membership === "ban") {
    // The user ban was removed.

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

export default useNotifications
