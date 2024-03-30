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
  type LocalNotificationProps,
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
        notification => notification.id !== notificationId
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
      // TODO: Handle here invited rooms.

      newNotifications.push({
        body: "invited you to join this room",
        id: invitedRoom.roomId,
        lastNotificationTime: Date.now(),
        avatarUrl: getImageUrl(invitedRoom.getMxcAvatarUrl(), client),
        displayName: invitedRoom.name,
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
        lastNotificationTime: notification.notificationTime,
        id: notification.notificationId,
        displayName: notification.senderName,
        avatarUrl: notification.avatarSenderName,
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
): LocalNotificationProps | null => {
  const eventId = event.getId()

  assert(eventId !== undefined, "eventId should not be undefined")

  switch (member.membership) {
    case "invite": {
      break
    }
    case "leave": {
      if (
        event.getSender() === client.getUserId() &&
        event.getPrevContent().membership === "invite"
      ) {
        const room = client.getRoom(event.getRoomId())

        return {
          body: "you rejected the invitation",
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: room?.name,
          avatarSenderName: getImageUrl(room?.getMxcAvatarUrl(), client),
        }
      }

      return {
        body: "expelled you from the room",
        isRead: false,
        notificationId: eventId,
        notificationTime: event.localTimestamp,
        senderName: event.sender?.name,
        avatarSenderName: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
      }
    }
    case "join": {
      break
    }
    case "ban": {
      // TODO: Handle here when the user has been banned.

      break
    }
    case undefined: {
      break
    }
  }

  return null
}

export default useNotifications
