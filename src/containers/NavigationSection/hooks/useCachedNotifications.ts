import {type NotificationProps} from "@/components/Notification"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import {
  getRoomPowerLevelByUserId,
  processPowerLevelByNumber,
  UserPowerLevel,
} from "@/utils/members"
import {
  getPowerLevelsHistory,
  type LocalNotificationData,
  type CurrentPowerLevelData,
  getNotificationsHistory,
  setNotificationsHistory,
  notificationTypeTransformer,
  setPowerLevelsHistory,
} from "@/utils/notifications"
import {generateUniqueNumber} from "@/utils/util"
import {RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useMemo, useState} from "react"

const useCachedNotifications = () => {
  const {client} = useConnection()
  const [isLoading, setIsLoading] = useState(false)

  const [cachedNotifications, setCachedNotifications] = useState<
    LocalNotificationData[]
  >(getNotificationsHistory())

  const [cachedPowerLevels, setCachedPowerLevels] = useState<
    CurrentPowerLevelData[]
  >(getPowerLevelsHistory())

  // #region Functions
  const saveCachedPowerLevel = useCallback(
    (newCachedPowerLevel: CurrentPowerLevelData) => {
      setCachedPowerLevels(prevPowerLevels => {
        const powerLevelsCleaned = prevPowerLevels.filter(
          prevPowerLevel => prevPowerLevel.roomId !== newCachedPowerLevel.roomId
        )

        const newCachedPowerLevels = [
          ...powerLevelsCleaned,
          newCachedPowerLevel,
        ]

        // Save notifications in local storage.
        setPowerLevelsHistory(newCachedPowerLevels)

        return newCachedPowerLevels
      })
    },
    []
  )

  const saveNotification = useCallback(
    (notification: LocalNotificationData) => {
      setCachedNotifications(prevNotifications => {
        // Avoid saving a duplicate notification.
        const notificationsCleaned = prevNotifications.filter(
          prevNotification =>
            prevNotification.notificationId !== notification.notificationId
        )

        const newNotifications = [...notificationsCleaned, notification]

        // Save notifications in local storage.
        setNotificationsHistory(newNotifications)

        return newNotifications
      })
    },
    []
  )

  const markAllNotificationsAsRead = useCallback(() => {
    setCachedNotifications(prevNotifications => {
      const newNotifications: LocalNotificationData[] = prevNotifications.map(
        prevNotification => {
          return {
            ...prevNotification,
            isRead: true,
          }
        }
      )

      // Save in local storage.
      setNotificationsHistory(newNotifications)

      return newNotifications
    })
  }, [])

  const markAsReadByNotificationId = useCallback((notificationId: string) => {
    setCachedNotifications(prevNotifications => {
      const newNotifications = prevNotifications.map(prevNotification => {
        if (prevNotification.notificationId !== notificationId) {
          return prevNotification
        }

        return {
          ...prevNotification,
          isRead: true,
        }
      })

      // Save notifications in local storage.
      setNotificationsHistory(newNotifications)

      return newNotifications
    })
  }, [])

  const deleteNotificationById = useCallback((notificationId: string) => {
    setCachedNotifications(prevNotification => {
      const newNotifications = prevNotification.filter(
        notification => notification.notificationId !== notificationId
      )

      // Save notifications in local storage.
      setNotificationsHistory(newNotifications)

      return newNotifications
    })
  }, [])

  // #region MemoData
  const unreadNotifications = useMemo(() => {
    return cachedNotifications.filter(notification => !notification.isRead)
      .length
  }, [cachedNotifications])

  const notifications: NotificationProps[] = useMemo(
    () =>
      cachedNotifications.map(cachedNotification => {
        if (cachedNotification.containsAction) {
          return {
            ...cachedNotification,
            onDelete: deleteNotificationById,
            markAsRead: markAsReadByNotificationId,
            action() {},
          }
        }

        return {
          ...cachedNotification,
          onDelete: deleteNotificationById,
          markAsRead: markAsReadByNotificationId,
        }
      }),
    [cachedNotifications, deleteNotificationById, markAsReadByNotificationId]
  )

  // #region useEffect
  useEffect(() => {
    if (client === null) {
      return
    }

    setIsLoading(true)

    const cachedLevelsHistory = getPowerLevelsHistory()

    void client
      .getJoinedRooms()
      .then(joinedRooms => {
        for (const roomId of joinedRooms.joined_rooms) {
          const room = client.getRoom(roomId)

          if (room === null) {
            continue
          }

          const currentPowerLevel = getRoomPowerLevelByUserId(
            room,
            room.myUserId
          )

          const cachedPowerLevel =
            cachedLevelsHistory.find(
              levelHistory => levelHistory.roomId === room.roomId
            )?.currentPowerLevel ?? UserPowerLevel.Member

          saveCachedPowerLevel({roomId: room.roomId, currentPowerLevel})

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
            senderMxcAvatarUrl: room.getMxcAvatarUrl() ?? undefined,
            containsAction: false,
          })
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [client, saveCachedPowerLevel, saveNotification])

  // #region Listener
  useEventListener(RoomMemberEvent.PowerLevel, (event, member) => {
    if (client === null || member.userId !== client.getUserId() || isLoading) {
      return
    }

    const room = client.getRoom(event.getRoomId())

    // You cannot listen to an event in a room to which you do not have access.
    if (room === null) {
      return
    }

    const prevUsersPowerLevels = event.getPrevContent().users
    const prevCurrentUserLevels = prevUsersPowerLevels[member.userId]

    const prevPowerLevels =
      prevCurrentUserLevels === undefined ||
      typeof prevCurrentUserLevels !== "number"
        ? UserPowerLevel.Member
        : prevCurrentUserLevels

    const currentPowerLevel = processPowerLevelByNumber(member.powerLevelNorm)
    saveCachedPowerLevel({roomId: room.roomId, currentPowerLevel})

    const notificationType = notificationTypeTransformer(
      currentPowerLevel,
      prevPowerLevels
    )

    // If `notificationType` is null there were no changes.
    if (notificationType === null) {
      return
    }

    const notificationId = event.getId() ?? event.localTimestamp

    saveNotification({
      isRead: false,
      notificationId: `notification${notificationId}`,
      roomId: room.roomId,
      notificationTime: event.localTimestamp,
      roomName: room.name,
      sender: "Room owners",
      type: notificationType,
      senderMxcAvatarUrl: room.getMxcAvatarUrl() ?? undefined,
      containsAction: false,
    })
  })

  return {
    notifications,
    unreadNotifications,
    markAllNotificationsAsRead,
    isLoading,
  }
}

export default useCachedNotifications
