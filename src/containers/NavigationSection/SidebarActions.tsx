import IconButton from "@/components/IconButton"
import {useState, type FC} from "react"
import {
  IoCall,
  IoExit,
  IoNotifications,
  IoPaperPlane,
  IoSearch,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import NotificationBoxPopup from "./modals/NotificationBoxPopup"
import useNotifications from "./hooks/useNotifications"
import {
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react"
import {motion} from "framer-motion"
import DirectChatsPopup from "./DirectChatsPopup"
import DMTrayPopup from "./DMTrayPopup"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useDmTray from "./hooks/useDmTray"

enum SidebarPopups {
  None,
  Notifications,
  DirectMessages,
}

const SidebarActions: FC<{className?: string}> = ({className}) => {
  const client = useMatrixClient()
  const [activePopup, setActivePopup] = useState(SidebarPopups.None)

  const {dmRooms, results, setQuery, userId, isDMLoading, clearResults} =
    useDmTray(client)

  const {isLoading, notifications, containsUnreadNotifications} =
    useNotifications(client)

  return (
    <>
      <NotificationBoxPopup
        isVisible={activePopup === SidebarPopups.Notifications}
        isLoading={isLoading}
        notifications={notifications}
        onClose={() => {
          setActivePopup(SidebarPopups.None)
        }}
      />

      <div
        className={twMerge(
          "flex flex-col items-center gap-2.5 pb-2",
          className
        )}>
        <DMTrayPopup
          isLoading={isDMLoading}
          userId={userId}
          dmRooms={dmRooms}
          searchResult={results}
          setQuery={setQuery}
          clearResult={clearResults}
          dmRoomClick={function (roomId: string): void {
            throw new Error("Function not implemented.")
          }}
          onResultUserClick={function (userId: string): void {
            throw new Error("Function not implemented.")
          }}
        />

        <IconButton
          tooltip="Notifications"
          iconClassName="text-slate-400"
          Icon={IoNotifications}
          isDotVisible={containsUnreadNotifications}
          onClick={() => {}}
          onMouseEnter={() => {
            setActivePopup(SidebarPopups.Notifications)
          }}
        />

        <IconButton
          tooltip="Search"
          iconClassName="text-slate-400"
          Icon={IoSearch}
          onClick={() => {}}
        />

        <IconButton
          tooltip="Calls"
          iconClassName="text-slate-400"
          Icon={IoCall}
          onClick={() => {}}
        />

        <IconButton
          tooltip="Exit"
          iconClassName="text-slate-400"
          Icon={IoExit}
          onClick={() => {}}
        />
      </div>
    </>
  )
}

type DirectMessagesButtonProps = {
  isPopupVisible: boolean
  onPopupVisibilityChange: (isPopupVisible: boolean) => void
  onClose: () => void
  className?: string
}

export const DirectMessagesButton: FC<DirectMessagesButtonProps> = ({
  onPopupVisibilityChange,
  isPopupVisible,
  onClose,
  className,
}) => {
  const {refs, floatingStyles, context} = useFloating({
    open: isPopupVisible,
    onOpenChange: onPopupVisibilityChange,
    placement: "right",
    middleware: [flip(), shift(), offset({mainAxis: 24, crossAxis: -4})],
  })

  const hover = useHover(context, {handleClose: safePolygon()})

  const {getReferenceProps, getFloatingProps} = useInteractions([hover])

  return (
    <>
      <motion.button
        className={twMerge("w-max", className)}
        aria-label="Direct chats"
        ref={refs.setReference}
        {...getReferenceProps()}>
        <IoPaperPlane className="text-slate-400" size={20} />
      </motion.button>

      {isPopupVisible && (
        <div
          className="z-50"
          {...getFloatingProps()}
          ref={refs.setFloating}
          style={floatingStyles}>
          <DirectChatsPopup />
        </div>
      )}
    </>
  )
}

export default SidebarActions
