import React, {useMemo, type FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import {type ButtonVariant} from "../../../components/Button"
import Typography, {TypographyVariant} from "@/components/Typography"
import IconButton from "../../../components/IconButton"
import Notification, {type NotificationProps} from "@/components/Notification"
import Loader from "@/components/Loader"
import {ModalRenderLocation} from "@/hooks/util/useActiveModal"
import {createPortal} from "react-dom"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

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
    document.querySelector(`#${ModalRenderLocation.RoomList}`) ?? document.body

  const isNotificationsEmpty = notifications.length === 0

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
        <div className="animate-fade m-2 flex size-full max-h-[80%] max-w-sm items-center">
          <motion.div
            initial={{scale: 0.5, opacity: 0.5}}
            animate={{scale: 1, opacity: 1}}
            transition={{type: "spring", damping: 15, stiffness: 200}}
            className={twMerge(
              "flex max-h-96 w-full flex-col gap-2 rounded-xl border border-slate-300 bg-gray-50 p-3 shadow-xl",
              isNotificationsEmpty && "translate-y-8"
            )}
            onMouseLeave={onClose}>
            {isNotificationsEmpty ? (
              <Typography className="w-full p-1">
                You not have notifications
              </Typography>
            ) : (
              <>
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
                ) : (
                  <div className="scrollbar-hide flex flex-col gap-1 overflow-y-scroll">
                    {notificationsComponents}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>,
      renderLocation
    )
  )
}

export default NotificationBoxPopup
