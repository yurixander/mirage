import {useCallback, useState, type FC} from "react"
import {IoExit, IoNotifications, IoPaperPlane} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useNotifications from "./hooks/useNotifications"
import DMTrayPopup, {DMUser} from "./DMTrayPopup"
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
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import RoomInvitedSplash, {
  RoomInvitedError,
} from "../RoomContainer/RoomInvitedSplash"
import {createDM} from "@/utils/rooms"

const SIDEBAR_BUTTON_SIZE = 20

const SidebarActions: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const client = useMatrixClient()
  const {t} = useTranslation()
  const {setActiveRoomId} = useActiveRoomIdStore()
  const [activeDmUser, setActiveDMUser] = useState<DMUser | null>(null)

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

  const onCreateRoomFromUser = useCallback(
    async (user: DMUser) => {
      if (client === null) {
        throw new RoomInvitedError(t(LangKey.ClientError))
      }

      await createDM(client, {
        name: user.displayName,
        invite: [user.userId],
      })
    },
    [client, t]
  )

  return (
    <>
      {activeDmUser !== null && (
        <RoomInvitedSplash
          isDirect
          onJoinRoom={() => onCreateRoomFromUser(activeDmUser)}
          onClose={() => setActiveDMUser(null)}
          roomDetailPreview={{
            status: "success",
            data: {
              name: activeDmUser.displayName,
              avatarUrl: activeDmUser.avatarUrl,
              detailChips: [t(LangKey.Direct)],
            },
          }}
        />
      )}

      <div
        className={twMerge("flex flex-col items-center gap-1 pb-2", className)}>
        <DMTrayPopup
          isLoading={isDMLoading}
          userId={userId}
          dmRooms={dmRooms}
          searchResult={results}
          setDebouncedQuery={setDebouncedQuery}
          clearResult={clearResults}
          dmRoomClick={setActiveRoomId}
          onResultUserClick={setActiveDMUser}>
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
