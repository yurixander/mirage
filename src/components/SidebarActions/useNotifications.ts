import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  type MatrixClient,
  type MatrixEvent,
  type RoomMember,
  RoomStateEvent,
} from "matrix-js-sdk"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedNotifications, {
  type LocalNotificationData,
} from "./useCachedNotifications"
import {assert, getImageUrl} from "@/utils/util"
import {ButtonVariant} from "../Button"

const useNotifications = () => {
  const {client} = useConnection()
  const {cachedNotifications, saveNotification, clearNotifications} =
    useCachedNotifications()

  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(
        notification => notification.notificationId !== notificationId
      )
    )
  }, [])

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
                  removeNotification(invitedRoom.roomId)
                }
              })
            },
          },
          {
            name: "Decline",
            onClick: () => {
              void client.leave(invitedRoom.roomId).then(() => {
                removeNotification(invitedRoom.roomId)
              })
            },
            actionVariant: ButtonVariant.TextLink,
          },
        ],
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
      })
    }

    setNotifications(newNotifications)
  }, [cachedNotifications, client, removeNotification])

  useEventListener(RoomStateEvent.Members, (event, state, member) => {
    if (client === null || client.getUserId() !== member.userId) {
      return
    }

    const notification = membersEventNotificationTransformer(
      event,
      client,
      member
    )

    if (notification === null) {
      return
    }

    saveNotification(notification)
  })

  return {notifications, clearNotifications}
}

const membersEventNotificationTransformer = (
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

  assert(eventId !== undefined, "eventId should not be undefined")

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
