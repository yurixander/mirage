import {type FC} from "react"
import {IoExit, IoNotifications, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useNotifications from "./hooks/useNotifications"
import DMTrayPopup from "./DMTrayPopup"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useDmTray from "./hooks/useDmTray"
import NotificationsTray from "./NotificationsTray"
import NotificationDot from "@/components/NotificationDot"
import {IconButton} from "@/components/ui/button"
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
          dmRoomClick={function (_roomId: string): void {
            throw new Error("DMRoomClick function not implemented.")
          }}
          onResultUserClick={function (_userId: string): void {
            throw new Error("onResultUserClick function not implemented.")
          }}>
          <IconButton
            asBoundary={false}
            aria-label={t(LangKey.ViewDirectChats)}>
            <IoPaperPlane size={SIDEBAR_BUTTON_SIZE} />
          </IconButton>
        </DMTrayPopup>

        <NotificationsTray isLoading={isLoading} notifications={notifications}>
          <IconButton
            asBoundary={false}
            aria-label={t(LangKey.ViewNotifications)}>
            <NotificationDot isVisible={containsUnreadNotifications}>
              <IoNotifications size={SIDEBAR_BUTTON_SIZE} />
            </NotificationDot>
          </IconButton>
        </NotificationsTray>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <IconButton asBoundary={false} aria-label={t(LangKey.ExitApp)}>
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
