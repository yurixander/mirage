import useConnection from "@/hooks/matrix/useConnection"
import {
  getRoomPowerLevelByUserId,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {
  getLocalPowerLevelsHistory,
  notificationTypeTransformer,
  setLocalPowerLevelsHistory,
} from "@/utils/notifications"
import {useCallback, useEffect, useState} from "react"
import {type NotificationProps} from "@/components/Notification"
import {generateUniqueNumber, getImageUrl} from "@/utils/util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {RoomMemberEvent} from "matrix-js-sdk"
import useEventListener from "@/hooks/matrix/useEventListener"

export type PowerLevelNotificationData = {
  roomId: string
  currentPowerLevel: UserPowerLevel
}

const useNotifications = () => {
  const {client} = useConnection()
  const [notifications, setNotifications] = useState<NotificationProps[]>([])
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)

  const [cachedPowerLevels, setCachedPowerLevels] = useState<
    PowerLevelNotificationData[]
  >([])

  const saveNotification = useCallback((notification: NotificationProps) => {
    setNotifications(prevNotifications => {
      // Avoid saving a duplicate notification.
      const notificationsCleaned = prevNotifications.filter(
        prevNotification =>
          prevNotification.notificationId !== notification.notificationId
      )

      return [...notificationsCleaned, notification]
    })
  }, [])

  const saveInCachedPowerLevels = useCallback(
    (cachedPowerLevel: PowerLevelNotificationData) => {
      setCachedPowerLevels(prevCachedPowerLevels => {
        // Avoid saving a duplicate notification.
        const cachedPowerLevelsCleaned = prevCachedPowerLevels.filter(
          prevCachedPowerLevel =>
            prevCachedPowerLevel.roomId !== cachedPowerLevel.roomId
        )

        const newCachedPowerLevels = [
          ...cachedPowerLevelsCleaned,
          cachedPowerLevel,
        ]

        setLocalPowerLevelsHistory(newCachedPowerLevels)

        return newCachedPowerLevels
      })
    },
    []
  )

  const markAsReadByNotificationId = useCallback((notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(prevNotification => {
        if (prevNotification.notificationId !== notificationId) {
          return prevNotification
        }

        return {
          ...prevNotification,
          isRead: true,
        }
      })
    )
  }, [])

  const deleteNotificationById = useCallback((notificationId: string) => {
    setNotifications(prevNotification =>
      prevNotification.filter(
        notification => notification.notificationId !== notificationId
      )
    )
  }, [])

  useEffect(() => {
    if (client === null) {
      return
    }

    setIsLoadingNotifications(true)

    const cachedPowerLevelNotifications = getLocalPowerLevelsHistory()
    const newPowerLevelNotifications: PowerLevelNotificationData[] = []
    const rooms = client.getRooms()
    const userId = client.getUserId()

    // TODO: Prefer use client.getJoinedRooms() instead.
    // TODO: Remove `PowerLevelNotificationData` by roomId when the user has left.
    for (const room of rooms) {
      if (room.getMyMembership() !== KnownMembership.Join) {
        continue
      }

      const currentPowerLevel = getRoomPowerLevelByUserId(room, userId)

      // Add new values to new list of power levels notifications.
      newPowerLevelNotifications.push({
        currentPowerLevel: currentPowerLevel ?? UserPowerLevel.Member,
        roomId: room.roomId,
      })

      const cachedPowerLevel =
        cachedPowerLevelNotifications.find(
          notification => notification.roomId === room.roomId
        ) ?? null

      const notificationType = notificationTypeTransformer(
        currentPowerLevel,
        cachedPowerLevel
      )

      if (notificationType === null) {
        continue
      }

      const id = generateUniqueNumber()

      saveNotification({
        isRead: false,
        notificationId: `notification${id}`,
        roomId: room.roomId,
        notificationTime: Date.now(),
        roomName: room.name,
        sender: "Room owners",
        type: notificationType,
        markAsRead: markAsReadByNotificationId,
        onDelete: deleteNotificationById,
        senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
      })
    }

    // Save in local storage the news power levels notifications.
    setCachedPowerLevels(newPowerLevelNotifications)
    setLocalPowerLevelsHistory(newPowerLevelNotifications)

    setIsLoadingNotifications(false)
  }, [
    client,
    deleteNotificationById,
    markAsReadByNotificationId,
    saveNotification,
  ])

  useEventListener(RoomMemberEvent.PowerLevel, (_, member) => {
    if (
      client === null ||
      member.userId !== client.getUserId() ||
      isLoadingNotifications
    ) {
      return
    }

    const currentPowerLevel = processPowerLevelByNumber(member.powerLevelNorm)

    const cachedPowerLevel =
      cachedPowerLevels.find(
        notification => notification.roomId === member.roomId
      ) ?? null

    const notificationType = notificationTypeTransformer(
      currentPowerLevel,
      cachedPowerLevel
    )

    const room = client.getRoom(member.roomId)

    if (notificationType === null || room === null) {
      return
    }

    const id = generateUniqueNumber()

    saveNotification({
      isRead: false,
      notificationId: `notification${id}`,
      roomId: member.roomId,
      notificationTime: Date.now(),
      roomName: room.name,
      sender: "Room owners",
      type: notificationType,
      markAsRead: markAsReadByNotificationId,
      onDelete: deleteNotificationById,
      senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
    })

    // Save in local storage the news power levels notifications.
    saveInCachedPowerLevels({
      roomId: member.roomId,
      currentPowerLevel,
    })
  })

  return {notifications}
}

export default useNotifications
