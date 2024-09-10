import {type FC} from "react"
import {IoCall, IoExit, IoNotifications, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useNotifications from "./hooks/useNotifications"
import DMTrayPopup from "./DMTrayPopup"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useDmTray from "./hooks/useDmTray"
import NotificationsTray from "./NotificationsTray"
import NotificationDot from "@/components/NotificationDot"
import {Button} from "@/components/ui/button"
import {useTranslation} from "react-i18next"
import {FaSearch} from "react-icons/fa"

const SIDEBAR_BUTTON_CLASS = "m-1 size-5 text-slate-400 hover:bg-transparent"
const SIDEBAR_BUTTON_SIZE = 20

const SidebarActions: FC<{className?: string}> = ({className}) => {
  const client = useMatrixClient()
  const {t} = useTranslation("navigation")

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
          }}>
          <Button
            aria-label={t("View Direct chats")}
            size="icon"
            variant="ghost"
            className={SIDEBAR_BUTTON_CLASS}>
            <IoPaperPlane size={SIDEBAR_BUTTON_SIZE} />
          </Button>
        </DMTrayPopup>

        <NotificationsTray isLoading={isLoading} notifications={notifications}>
          <Button
            aria-label={t("View notifications")}
            size="icon"
            variant="ghost"
            className={SIDEBAR_BUTTON_CLASS}>
            <NotificationDot isVisible={containsUnreadNotifications}>
              <IoNotifications size={SIDEBAR_BUTTON_SIZE} />
            </NotificationDot>
          </Button>
        </NotificationsTray>

        <Button
          aria-label={t("Search anything")}
          size="icon"
          variant="ghost"
          className={SIDEBAR_BUTTON_CLASS}
          onClick={() => {}}>
          <FaSearch size={SIDEBAR_BUTTON_SIZE} />
        </Button>

        <Button
          aria-label={t("Calls")}
          size="icon"
          variant="ghost"
          className={SIDEBAR_BUTTON_CLASS}
          onClick={() => {}}>
          <IoCall size={SIDEBAR_BUTTON_SIZE} />
        </Button>

        <Button
          aria-label={t("Exit app")}
          size="icon"
          variant="ghost"
          className={SIDEBAR_BUTTON_CLASS}
          onClick={() => {}}>
          <IoExit size={SIDEBAR_BUTTON_SIZE} />
        </Button>
      </div>
    </>
  )
}

export default SidebarActions
