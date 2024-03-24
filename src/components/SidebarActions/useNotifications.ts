import {useState} from "react"
import {type NotificationProps} from "./NotificationsModal"
import useEventListener from "@/hooks/matrix/useEventListener"
import {RoomEvent} from "matrix-js-sdk"
import {ButtonVariant} from "../Button"

const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  useEventListener(
    RoomEvent.MyMembership,
    (room, membership, _prevMembership) => {
      if (membership === "invite") {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          {
            event: "has invited for this room",
            lastNotificationTime: Date.now(),
            displayName: room.normalizedName,
            actions: [
              {
                name: "Accept",
                onClick: () => {
                  // TODO: Handle here accept invitation.
                },
              },
              {
                name: "Decline",
                onClick: () => {
                  // TODO: Handle here decline invitation.
                },
                actionVariant: ButtonVariant.TextLink,
              },
            ],
          },
        ])
      }
    }
  )

  return {notifications}
}

export default useNotifications
