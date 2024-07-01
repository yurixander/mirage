import {type NotificationProps} from "@/components/Notification"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
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
import {RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useMemo, useState} from "react"

enum NotificationState {
  Waiting,
  Loading,
  Prepared,
}

const useNotifications = () => {
  const {client} = useConnection()
  const [notificationsState, setNotificationsState] = useState(
    NotificationState.Waiting
  )

  const [cachedNotifications, setCachedNotifications] = useState<
    LocalNotificationData[]
  >(getNotificationsHistory())

  // #region Functions
  const saveCachedPowerLevel = useCallback(
    (newCachedPowerLevel: CurrentPowerLevelData) => {
      const powerLevelsCleaned = getPowerLevelsHistory().filter(
        prevPowerLevel => prevPowerLevel.roomId !== newCachedPowerLevel.roomId
      )

      setPowerLevelsHistory([...powerLevelsCleaned, newCachedPowerLevel])
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

  const fetchNotifications = useCallback(async () => {
    if (client === null || notificationsState !== NotificationState.Waiting) {
      return
    }

    setNotificationsState(NotificationState.Loading)

    const cachedLevelsHistory = getPowerLevelsHistory()
    const joinedRooms = await client.getJoinedRooms()

    for (const roomId of joinedRooms.joined_rooms) {
      const room = client.getRoom(roomId)

      if (room === null) {
        continue
      }

      const currentPowerLevel = getRoomPowerLevelByUserId(room, room.myUserId)

      const cachedPowerLevel =
        cachedLevelsHistory.find(levelHistory => levelHistory.roomId === roomId)
          ?.currentPowerLevel ?? UserPowerLevel.Member

      const notificationType = notificationTypeTransformer(
        currentPowerLevel,
        cachedPowerLevel
      )

      if (notificationType === null) {
        continue
      }

      const id = generateUniqueNumber()

      saveCachedPowerLevel({roomId: room.roomId, currentPowerLevel})

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

    setNotificationsState(NotificationState.Prepared)
  }, [client, notificationsState, saveCachedPowerLevel, saveNotification])

  // #region useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchNotifications()
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [fetchNotifications])

  // #region Listener
  useEventListener(RoomMemberEvent.PowerLevel, (_, member) => {
    if (
      client === null ||
      member.userId !== client.getUserId() ||
      notificationsState !== NotificationState.Prepared
    ) {
      return
    }

    setNotificationsState(NotificationState.Waiting)

    void fetchNotifications()
  })

  return {
    notifications,
    unreadNotifications,
    markAllNotificationsAsRead,
    isLoading: notificationsState === NotificationState.Loading,
  }
}

export default useNotifications
