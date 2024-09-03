import IconButton from "@/components/IconButton"
import {type FC} from "react"
import {IoCall, IoExit, IoSearch} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useNotifications from "./hooks/useNotifications"
import DMTrayPopup from "./DMTrayPopup"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useDmTray from "./hooks/useDmTray"
import NotificationsTray from "./NotificationsTray"

const SidebarActions: FC<{className?: string}> = ({className}) => {
  const client = useMatrixClient()

  const {dmRooms, results, setQuery, userId, isDMLoading, clearResults} =
    useDmTray(client)

  const {isLoading, notifications, containsUnreadNotifications} =
    useNotifications(client)

  return (
    <>
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

        <NotificationsTray
          isLoading={isLoading}
          containsUnreadNotifications={containsUnreadNotifications}
          notifications={notifications}
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
