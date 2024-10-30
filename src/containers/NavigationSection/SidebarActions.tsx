import {type FC} from "react"
import {IoCall, IoExit, IoNotifications, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useNotifications from "./hooks/useNotifications"
import DMTrayPopup from "./DMTrayPopup"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useDmTray from "./hooks/useDmTray"
import NotificationsTray from "./NotificationsTray"
import NotificationDot from "@/components/NotificationDot"
import {IconButton} from "@/components/ui/button"
import {FaSearch} from "react-icons/fa"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Heading} from "@/components/ui/typography"
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog"

const SIDEBAR_BUTTON_CLASS =
  "text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800"
const SIDEBAR_BUTTON_SIZE = 20

const SidebarActions: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const client = useMatrixClient()
  const {t} = useTranslation()

  const {
    dmRooms,
    results,
    setDebouncedQuery,
    userId,
    isDMLoading,
    clearResults,
  } = useDmTray(client)

  const {isLoading, notifications, containsUnreadNotifications} =
    useNotifications(client)

  return (
    <>
      <div
        className={twMerge("flex flex-col items-center gap-1 pb-2", className)}>
        <DMTrayPopup
          isLoading={isDMLoading}
          userId={userId}
          dmRooms={dmRooms}
          searchResult={results}
          setDebouncedQuery={setDebouncedQuery}
          clearResult={clearResults}
          dmRoomClick={function (roomId: string): void {
            throw new Error("DMRoomClick function not implemented.")
          }}
          onResultUserClick={function (userId: string): void {
            throw new Error("onResultUserClick function not implemented.")
          }}>
          <IconButton
            asBoundary={false}
            aria-label={t(LangKey.ViewDirectChats)}
            className={SIDEBAR_BUTTON_CLASS}>
            <IoPaperPlane size={SIDEBAR_BUTTON_SIZE} />
          </IconButton>
        </DMTrayPopup>

        <NotificationsTray isLoading={isLoading} notifications={notifications}>
          <IconButton
            asBoundary={false}
            aria-label={t(LangKey.ViewNotifications)}
            className={SIDEBAR_BUTTON_CLASS}>
            <NotificationDot isVisible={containsUnreadNotifications}>
              <IoNotifications size={SIDEBAR_BUTTON_SIZE} />
            </NotificationDot>
          </IconButton>
        </NotificationsTray>

        <IconButton
          className={SIDEBAR_BUTTON_CLASS}
          aria-label={t(LangKey.SearchAnything)}>
          <FaSearch size={SIDEBAR_BUTTON_SIZE - 1} />
        </IconButton>

        <IconButton
          className={SIDEBAR_BUTTON_CLASS}
          aria-label={t(LangKey.Calls)}>
          <IoCall size={SIDEBAR_BUTTON_SIZE} />
        </IconButton>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <IconButton
              asBoundary={false}
              aria-label={t(LangKey.ExitApp)}
              className={SIDEBAR_BUTTON_CLASS}>
              <IoExit size={SIDEBAR_BUTTON_SIZE} />
            </IconButton>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle asChild>
              <Heading level="h3">{t(LangKey.LogOut)}</Heading>
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t(LangKey.LogOutDescription)}
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>{t(LangKey.Cancel)}</AlertDialogCancel>

              <AlertDialogAction onClick={onLogOut}>
                {t(LangKey.Accept)}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default SidebarActions
