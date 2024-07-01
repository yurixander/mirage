import React, {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import {type ButtonVariant} from "../../../components/Button"
import Typography, {TypographyVariant} from "../../../components/Typography"
import IconButton from "../../../components/IconButton"
import Notification, {type NotificationProps} from "@/components/Notification"
import Loader from "@/components/Loader"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"
import {createPortal} from "react-dom"

export type NotificationActions = {
  name: string
  actionVariant?: ButtonVariant
  onClick: () => void
}

export type NotificationBoxPopupProps = {
  notifications: NotificationProps[]
  isLoading: boolean
  isVisible: boolean
  onClose: () => void
}

const sortNotificationsByReadState = (
  a: NotificationProps,
  b: NotificationProps
): number => {
  if (a.isRead === b.isRead) {
    return a.notificationTime - b.notificationTime
  }

  return a.isRead ? 1 : -1
}

const NotificationBoxPopup: FC<NotificationBoxPopupProps> = ({
  onClose,
  notifications,
  isLoading,
  isVisible,
}) => {
  const renderLocation =
    document.querySelector(`#${ModalRenderLocation.ChatContainer}`) ??
    document.body

  const notificationsComponents: React.JSX.Element[] = useMemo(
    () =>
      notifications
        .sort(sortNotificationsByReadState)
        .map(anyNotification => (
          <Notification
            {...anyNotification}
            key={anyNotification.notificationId}
          />
        )),
    [notifications]
  )

  return (
    isVisible &&
    createPortal(
      <div className="absolute z-50 flex size-full w-screen flex-col items-start justify-end">
        <div className="m-2 flex size-full max-h-[80%] max-w-sm flex-col gap-2 rounded-xl border border-slate-300 bg-gray-50 p-3 shadow-2xl">
          <div className="flex w-full justify-between p-1">
            <Typography variant={TypographyVariant.Heading}>
              Notifications
            </Typography>

            <IconButton
              iconClassName="text-gray-500"
              onClick={onClose}
              tooltip="Close"
              Icon={IoCloseCircle}
            />
          </div>

          {isLoading ? (
            <Loader text="Loading notifications" />
          ) : notifications.length > 0 ? (
            <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide">
              {notificationsComponents}
            </div>
          ) : (
            <div className="flex size-full flex-col items-center justify-center">
              <Typography variant={TypographyVariant.Heading}>
                No notifications
              </Typography>

              <Typography variant={TypographyVariant.BodyMedium}>
                Join rooms, chat with users to get notifications
              </Typography>
            </div>
          )}
        </div>
      </div>,
      renderLocation
    )
  )
}

export default NotificationBoxPopup
