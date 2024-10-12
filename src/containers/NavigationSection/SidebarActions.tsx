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

const SIDEBAR_BUTTON_CLASS = "m-1 size-5 text-slate-400 hover:bg-transparent"
const SIDEBAR_BUTTON_SIZE = 20

const SidebarActions: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const client = useMatrixClient()
  const {t} = useTranslation()

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
            aria-label={t(LangKey.ViewDirectChats)}
            size="icon"
            variant="ghost"
            className={SIDEBAR_BUTTON_CLASS}>
            <IoPaperPlane size={SIDEBAR_BUTTON_SIZE} />
          </Button>
        </DMTrayPopup>

        <NotificationsTray isLoading={isLoading} notifications={notifications}>
          <Button
            aria-label={t(LangKey.ViewNotifications)}
            size="icon"
            variant="ghost"
            className={SIDEBAR_BUTTON_CLASS}>
            <NotificationDot isVisible={containsUnreadNotifications}>
              <IoNotifications size={SIDEBAR_BUTTON_SIZE} />
            </NotificationDot>
          </Button>
        </NotificationsTray>

        <Button
          aria-label={t(LangKey.SearchAnything)}
          size="icon"
          variant="ghost"
          className={SIDEBAR_BUTTON_CLASS}
          onClick={() => {}}>
          <FaSearch size={SIDEBAR_BUTTON_SIZE} />
        </Button>

        <Button
          aria-label={t(LangKey.Calls)}
          size="icon"
          variant="ghost"
          className={SIDEBAR_BUTTON_CLASS}
          onClick={() => {}}>
          <IoCall size={SIDEBAR_BUTTON_SIZE} />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              asBoundary={false}
              aria-label={t(LangKey.ExitApp)}
              size="icon"
              variant="ghost"
              className={SIDEBAR_BUTTON_CLASS}>
              <IoExit size={SIDEBAR_BUTTON_SIZE} />
            </Button>
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
