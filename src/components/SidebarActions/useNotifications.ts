import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useEventListener from "@/hooks/matrix/useEventListener"
import {type MatrixClient, type Room, RoomStateEvent} from "matrix-js-sdk"
import {ButtonVariant} from "../Button"
import useConnection from "@/hooks/matrix/useConnection"

const useNotifications = () => {
  const {client} = useConnection()
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
  }, [client, removeNotification])

  useEventListener(RoomStateEvent.Members, (event, state, member) => {
    if (client === null) {
      return
    }

    const room = client.getRoom(state.roomId)

    if (room === null || member.membership === undefined) {
      return
    }

    const onRemoveNotification = () => {
      // Check if the sender of the event is the same as the user who received the invitation.
      if (event.getSender() === member.userId) {
        // If so, remove the invitation notification for this room
        removeNotification(room.roomId)
      }
    }

    switch (member.membership) {
      case "invite": {
        setNotifications([
          inviteRoomNotificationTransformer(room, Date.now(), client),
        ])

        break
      }
      case "leave": {
        // When user leaves the room.
        onRemoveNotification()

        // TODO: Handle here when the user has been expelled.

        break
      }
      case "join": {
        // When user joined the room.
        onRemoveNotification()

        break
      }
      case "ban": {
        // TODO: Handle here when the user has been banned.

        break
      }
    }
  })

  return {notifications}
}

const inviteRoomNotificationTransformer = (
  room: Room,
  lastNotificationTime: number,
  client: MatrixClient
): NotificationProps => {
  return {
    event: "has invited for this room",
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
