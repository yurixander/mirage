import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useConnection from "@/hooks/matrix/useConnection"
import useCachedNotifications, {
  NotificationsSyncState,
  useNotificationsStateStore,
} from "./useCachedNotifications"
import {checkIsDirectRoom, getImageUrl} from "@/utils/util"
import {ButtonVariant} from "../Button"
import {
  deleteNotificationById,
  markAllNotificationsAsRead,
} from "@/utils/notifications"

const useNotifications = () => {
  const {client} = useConnection()
  const {setNotificationsState} = useNotificationsStateStore()
  const [notifications, setNotifications] = useState<NotificationProps[]>([])
  const {cachedNotifications} = useCachedNotifications()

  const onRequestChanges = useCallback(() => {
    setNotificationsState(NotificationsSyncState.Pending)
  }, [setNotificationsState])

  const onMarkAllAsRead = useCallback(() => {
    markAllNotificationsAsRead()
    setNotificationsState(NotificationsSyncState.Processed)
  }, [setNotificationsState])

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
      const isDirectRoom = checkIsDirectRoom(client, invitedRoom)
      const inviteSenderMember = invitedRoom.getAvatarFallbackMember()

      const avatarUrl = isDirectRoom
        ? inviteSenderMember?.getMxcAvatarUrl()
        : invitedRoom.getMxcAvatarUrl()

      newNotifications.push({
        body: "invited you to join this room",
        notificationId: invitedRoom.roomId,
        notificationTime: Date.now(),
        avatarSenderUrl: getImageUrl(avatarUrl, client),
        senderName: invitedRoom.name,
        isRead: false,
        actions: [
          {
            name: "Accept",
            onClick: () => {
              void client.joinRoom(invitedRoom.roomId).then(room => {
                // TODO: Check because with direct rooms it does not delete the notification.
                if (room.getMyMembership() === "join") {
                  deleteNotificationById(invitedRoom.roomId)
                  onRequestChanges()
                }
              })
            },
          },
          {
            name: "Decline",
            onClick: () => {
              void client.leave(invitedRoom.roomId).then(() => {
                deleteNotificationById(invitedRoom.roomId)
                onRequestChanges()
              })
            },
            actionVariant: ButtonVariant.TextLink,
          },
        ],
        onRequestChanges,
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
        onRequestChanges,
      })
    }

    setNotifications(newNotifications)
  }, [cachedNotifications, client, onRequestChanges])

  return {notifications, onMarkAllAsRead}
}

export default useNotifications
