import {type NotificationProps} from "@/components/Notification"
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
  NotificationType,
} from "@/utils/notifications"
import {generateRandomId, getImageUrl} from "@/utils/util"
import {t} from "i18next"
import {type MatrixClient, RoomEvent, RoomMemberEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {useCallback, useEffect, useMemo, useState} from "react"

enum NotificationState {
  Waiting,
  Loading,
  Prepared,
}

const NOTIFICATION_SENDER_NAME = "Room owners"

type UseNotificationsReturnType = {
  isLoading: boolean
  notifications: NotificationProps[]
  containsUnreadNotifications: boolean
}

const useNotifications = (
  client: MatrixClient | null
): UseNotificationsReturnType => {
  const [notificationsState, setNotificationsState] = useState(
    NotificationState.Waiting
  )

  const [cachedNotifications, setCachedNotifications] = useState<
    LocalNotificationData[]
  >(getNotificationsHistory())

  // #region Functions
  const saveCachedLevels = useCallback(
    (newCachedLevels: CurrentPowerLevelData) => {
      const levelsCleaned = getPowerLevelsHistory().filter(
        prevLevels => prevLevels.roomId !== newCachedLevels.roomId
      )

      setPowerLevelsHistory([...levelsCleaned, newCachedLevels])
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
  const containsUnreadNotifications = useMemo(() => {
    return cachedNotifications.some(notification => !notification.isRead)
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

  const fetchInvitedNotifications = useCallback(() => {
    if (client === null) {
      return
    }

    const rooms = client.getRooms()

    for (const room of rooms) {
      if (room.getMyMembership() !== KnownMembership.Invite) {
        continue
      }

      saveNotification({
        isRead: false,
        notificationId: `notification-${room.roomId}`,
        roomId: room.roomId,
        notificationTime: Date.now(),
        roomName: room.name,
        sender: t(NOTIFICATION_SENDER_NAME),
        type: NotificationType.Invited,
        containsAction: true,
        senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
      })
    }
  }, [client, saveNotification])

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

      saveCachedLevels({roomId: room.roomId, currentPowerLevel})

      saveNotification({
        isRead: false,
        notificationId: `notification-${generateRandomId()}`,
        roomId: room.roomId,
        notificationTime: Date.now(),
        roomName: room.name,
        sender: NOTIFICATION_SENDER_NAME,
        type: notificationType,
        senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
        containsAction: false,
      })
    }

    setNotificationsState(NotificationState.Prepared)
  }, [client, notificationsState, saveCachedLevels, saveNotification])

  // #region useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchNotifications()
      fetchInvitedNotifications()
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [fetchInvitedNotifications, fetchNotifications])

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

  useEventListener(
    RoomEvent.MyMembership,
    (room, membership, prevMembership) => {
      if (client === null) {
        return
      }

      if (
        membership === KnownMembership.Leave &&
        prevMembership === KnownMembership.Invite
      ) {
        saveNotification({
          isRead: false,
          notificationId: `notification-${room.roomId}`,
          roomId: room.roomId,
          notificationTime: Date.now(),
          roomName: room.name,
          sender: NOTIFICATION_SENDER_NAME,
          type: NotificationType.InvitationRemoved,
          containsAction: false,
          senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
        })

        return
      }

      if (membership !== KnownMembership.Invite) {
        return
      }

      saveNotification({
        isRead: false,
        notificationId: `notification-${room.roomId}`,
        roomId: room.roomId,
        notificationTime: Date.now(),
        roomName: room.name,
        sender: NOTIFICATION_SENDER_NAME,
        type: NotificationType.Invited,
        containsAction: true,
        senderAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
      })
    }
  )

  return {
    notifications,
    containsUnreadNotifications,
    isLoading: notificationsState === NotificationState.Loading,
  }
}

export default useNotifications
