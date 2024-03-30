import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  type MatrixClient,
  type MatrixEvent,
  type Room,
  type RoomMember,
  RoomStateEvent,
} from "matrix-js-sdk"
import {ButtonVariant} from "../Button"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedNotifications, {
  type LocalNotificationProps,
} from "./useCachedNotifications"
import {getImageUrl} from "@/utils/util"

const useNotifications = () => {
  const {client} = useConnection()
  const {cachedNotifications, saveNotification} = useCachedNotifications()
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

    const notificationsTwo: NotificationProps[] = []

    for (const notification of cachedNotifications) {
      notificationsTwo.push({
        body: notification.body,
        lastNotificationTime: notification.notificationTime,
        id: notification.notificationId,
        displayName: notification.senderName,
      })
    }

    setNotifications(notificationsTwo)

    // Handle history user notifications.
    const notifications: NotificationProps[] = []

    const invitedRooms = client
      .getRooms()
      .filter(room => room.getMyMembership() === "invite")

    for (const invitedRoom of invitedRooms) {
      notifications.push(
        inviteRoomNotificationTransformer(invitedRoom, Date.now(), client)
      )
    }

    setNotifications(notifications)
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

  return {notifications}
}

const membersEventNotificationTransformer = (
  event: MatrixEvent,
  client: MatrixClient,
  member: RoomMember
): LocalNotificationProps | null => {
  const eventId = event.getId()

  if (eventId === undefined || member.membership === undefined) {
    console.error("Event id not found", event)

    return null
  }

  switch (member.membership) {
    case "invite": {
      break
    }
    case "leave": {
      if (event.getSender() !== client.getUserId()) {
        const eventId = event.getId()

        if (eventId === undefined) {
          console.error("eventID not found", event)

          return null
        }

        return {
          body: "expelled you from the room",
          isRead: false,
          notificationId: eventId,
          notificationTime: event.localTimestamp,
          senderName: event.sender?.name,
          avatarSenderName: getImageUrl(
            event.sender?.getMxcAvatarUrl(),
            client
          ),
        }
      }

      // TODO: Handle here when the user has been expelled.

      break
    }
    case "join": {
      break
    }
    case "ban": {
      // TODO: Handle here when the user has been banned.

      break
    }
  }

  return null
}

const inviteRoomNotificationTransformer = (
  room: Room,
  lastNotificationTime: number,
  client: MatrixClient
): NotificationProps => {
  return {
    body: "has invited for this room",
    lastNotificationTime,
    displayName: room.normalizedName,
    // TODO: Prefer use other id type that be unique.
    id: room.roomId,
    actions: [
      {
        name: "Accept",
        onClick: () => {
          void client.joinRoom(room.roomId)
        },
      },
      {
        name: "Decline",
        onClick: () => {
          void client.leave(room.roomId)
        },
        actionVariant: ButtonVariant.TextLink,
      },
    ],
  }
}

export default useNotifications
