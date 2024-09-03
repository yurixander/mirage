import IconButton from "@/components/IconButton"
import {useState, type FC} from "react"
import {IoCall, IoExit, IoNotifications, IoSearch} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import NotificationBoxPopup from "./modals/NotificationBoxPopup"
import useNotifications from "./hooks/useNotifications"
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
            throw new Error("DMRoomClick function not implemented.")
          }}
          onResultUserClick={function (userId: string): void {
            throw new Error("onResultUserClick function not implemented.")
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

export default SidebarActions
