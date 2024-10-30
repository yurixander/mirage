import {type FC} from "react"
import {IconButton} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {IoCopy} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import UserProfile from "@/components/UserProfile"
import {
  stringToColor,
  getUsernameByUserId,
  validateMatrixUser,
} from "@/utils/util"
import Loader from "@/components/Loader"
import useTooltip from "@/hooks/util/useTooltip"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"
import {SearchInput} from "@/components/ui/input"
import {useIsSmall} from "@/hooks/util/useMediaQuery"

export type DMUser = {
  displayName: string
  userId: string
  avatarUrl?: string
}

export type DMRoomData = {
  partnerName: string
  partnerId: string
  roomId: string
}

export type DMTrayPopupProps = {
  isLoading: boolean
  userId?: string
  dmRooms: DMRoomData[]
  searchResult: DMUser[] | null
  children: React.JSX.Element
  dmRoomClick: (roomId: string) => void
  onResultUserClick: (userId: string) => void
  setDebouncedQuery: (query: string) => void
  clearResult: () => void
}

const DMTrayPopup: FC<DMTrayPopupProps> = ({
  dmRooms,
  userId,
  isLoading,
  onResultUserClick,
  dmRoomClick,
  searchResult,
  setDebouncedQuery,
  clearResult,
  children,
}) => {
  const {t} = useTranslation()
  const isSmall = useIsSmall()

  const invitationLink =
    userId !== undefined && validateMatrixUser(userId)
      ? `https://matrix.to/#/${userId}`
      : null

  return (
    <HoverCard
      openDelay={50}
      closeDelay={50}
      onOpenChange={isOpen => {
        if (!isOpen) {
          clearResult()
        }
      }}>
      <HoverCardTrigger children={children} asChild />

      <HoverCardContent asChild side={isSmall ? "right" : "top"}>
        <div className="flex h-full w-screen flex-col gap-3 overflow-hidden overflow-y-auto rounded-md border dark:bg-neutral-900 sm:m-2 sm:h-[520px] sm:w-[480px] md:h-[620px]">
          {isLoading ? (
            <Loader text={t(LangKey.LoadingDMs)} />
          ) : (
            <>
              <Heading>{t(LangKey.DirectChats)}</Heading>

              <div className="flex h-full flex-col gap-2">
                <Text>{t(LangKey.DMTrayFindUserDescription)}</Text>

                <SearchInput
                  hasIcon
                  onQueryDebounceChange={setDebouncedQuery}
                  placeholder={t(LangKey.EnterNameOrUsername)}
                />

                <div className="flex h-48 flex-col gap-1 overflow-y-auto sm:max-h-72">
                  {searchResult === null ? (
                    dmRooms.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center">
                        <Heading align="center">
                          {t(LangKey.RoomsEmptyTitle)}
                        </Heading>

                        <Text align="center">
                          {t(LangKey.RoomsEmptySubtitle)}
                        </Text>
                      </div>
                    ) : (
                      <>
                        <Text className="p-2">
                          {t(LangKey.RecentConversations)}
                        </Text>

                        <div className="grow overflow-y-auto">
                          <div className="flex flex-col gap-1">
                            {dmRooms.map((dmRoom, index) => {
                              return (
                                <DMDisplay
                                  key={index}
                                  id={dmRoom.partnerId}
                                  displayName={dmRoom.partnerName}
                                  onClick={() => {
                                    dmRoomClick(dmRoom.roomId)
                                  }}
                                />
                              )
                            })}
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    searchResult.map((dmUser, index) => (
                      <DMDisplay
                        key={index}
                        id={dmUser.userId}
                        displayName={dmUser.displayName}
                        onClick={() => {
                          onResultUserClick(dmUser.userId)
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Text size="2">{t(LangKey.DMTrayFoundedDescription)}</Text>

                <InvitationLinkBar invitationLink={invitationLink} />
              </div>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

const InvitationLinkBar: FC<{invitationLink: string | null}> = ({
  invitationLink,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex h-10 items-center justify-between rounded border border-neutral-300 bg-neutral-50 px-2 dark:border-neutral-700 dark:bg-neutral-800">
      <Text className="select-text text-purple-600 dark:text-purple-400">
        {invitationLink ?? t(LangKey.UserInvalid)}
      </Text>

      <IconButton
        className="text-neutral-500 dark:text-neutral-400"
        aria-label={t(LangKey.CopyLink)}
        tooltip={t(LangKey.CopyLink)}
        onClick={() => {
          if (invitationLink === null) {
            throw new Error(t(LangKey.InvitationLinkIncorrect))
          }

          void navigator.clipboard.writeText(invitationLink).catch(error => {
            throw new Error(`${t(LangKey.Error)}: ${error}`)
          })
        }}>
        <IoCopy />
      </IconButton>
    </div>
  )
}

type DMDisplayProps = {
  id: string
  displayName: string
  onClick: () => void
  avatarUrl?: string
  className?: string
}

const DMDisplay: FC<DMDisplayProps> = ({
  id,
  displayName,
  avatarUrl,
  onClick,
  className,
}) => {
  const {showTooltip, renderRef} = useTooltip<HTMLButtonElement>()
  const {t} = useTranslation()

  return (
    <button
      ref={renderRef}
      aria-label={`${t(LangKey.DMChatWith)} ${displayName}`}
      onClick={() => {
        try {
          onClick()
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showTooltip(`${t(LangKey.OpenChatError)}:  ${error.message}`, true)
        }
      }}
      className={twMerge(
        "flex w-full max-w-md cursor-pointer flex-row items-center justify-between rounded-2xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800",
        className
      )}>
      <UserProfile
        isSquare={false}
        isNameShorted={false}
        avatarUrl={avatarUrl}
        displayName={displayName}
        displayNameColor={stringToColor(id)}>
        <Text>{getUsernameByUserId(id)}</Text>
      </UserProfile>
    </button>
  )
}

export default DMTrayPopup
