import {type NotificationProps} from "@/components/Notification"
import useConnection from "@/hooks/matrix/useConnection"
import {getRoomPowerLevelByUserId, UserPowerLevel} from "@/utils/members"
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

  return {
    notifications,
    unreadNotifications,
    markAllNotificationsAsRead,
    isLoading,
  }
}

export default useCachedNotifications
