import {type FC} from "react"
import {Button} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {IoCopy} from "react-icons/io5"
import Typography, {TypographyVariant} from "@/components/Typography"
import Input from "@/components/Input"
import {twMerge} from "tailwind-merge"
import UserProfile from "@/components/UserProfile"
import {
  stringToColor,
  getUsernameByUserId,
  validateMatrixUser,
} from "@/utils/util"
import Loader from "@/components/Loader"
import useTooltip from "@/hooks/util/useTooltip"
import {IoIosSearch} from "react-icons/io"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

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
  setQuery: (query: string) => void
  clearResult: () => void
}

const DMTrayPopup: FC<DMTrayPopupProps> = ({
  dmRooms,
  userId,
  isLoading,
  onResultUserClick,
  dmRoomClick,
  searchResult,
  setQuery,
  clearResult,
  children,
}) => {
  const {t} = useTranslation()

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
      <HoverCardTrigger>{children}</HoverCardTrigger>

      <HoverCardContent asChild side="right">
        <div className="z-50 m-2 flex h-[520px] w-[480px] flex-col gap-3 overflow-hidden rounded-md border border-slate-300 md:h-[620px]">
          {isLoading ? (
            <Loader text={t(LangKey.LoadingDMs)} />
          ) : (
            <>
              <Typography variant={TypographyVariant.Heading}>
                {t(LangKey.DirectChats)}
              </Typography>

              <div className="flex flex-col gap-2">
                <Typography className="text-black">
                  {t(LangKey.DMTrayFindUserDescription)}
                </Typography>

                <Input
                  onValueChange={setQuery}
                  Icon={IoIosSearch}
                  placeholder={t(LangKey.EnterNameOrUsername)}
                />

                <div className="flex max-h-72 flex-col gap-1 overflow-y-auto">
                  {searchResult === null ? (
                    dmRooms.length === 0 ? (
                      <div className="flex h-72 flex-col items-center justify-center">
                        <Typography variant={TypographyVariant.Heading}>
                          {t(LangKey.RoomsEmptyTitle)}
                        </Typography>

                        <Typography>{t(LangKey.RoomsEmptySubtitle)}</Typography>
                      </div>
                    ) : (
                      <>
                        <Typography className="p-2 text-black">
                          {t(LangKey.RecentConversations)}
                        </Typography>

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

              <div className="mt-auto flex flex-col gap-2">
                <Typography className="text-black">
                  {t(LangKey.DMTrayFoundedDescription)}
                </Typography>

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
    <div className="flex h-10 items-center justify-between rounded border border-neutral-300 bg-neutral-50 px-2">
      <Typography
        variant={TypographyVariant.BodyMedium}
        className="select-text text-blue-600">
        {invitationLink ?? t(LangKey.UserInvalid)}
      </Typography>

      <Button
        aria-label="Copy invitation link"
        className="text-slate-300 hover:bg-transparent hover:text-slate-600"
        variant="ghost"
        size="icon"
        onClick={() => {
          if (invitationLink === null) {
            throw new Error(t(LangKey.InvitationLinkIncorrect))
          }

          void navigator.clipboard.writeText(invitationLink).catch(error => {
            throw new Error(`${t(LangKey.CopyLinkError)}: ${error}`)
          })
        }}>
        <IoCopy />
      </Button>
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
        "flex w-full max-w-md cursor-pointer flex-row items-center justify-between rounded-2xl px-3 py-2 hover:bg-gray-100",
        className
      )}>
      <UserProfile
        isSquare={false}
        isNameShorted={false}
        avatarUrl={avatarUrl}
        displayName={displayName}
        displayNameColor={stringToColor(id)}>
        <Typography variant={TypographyVariant.BodySmall}>
          {getUsernameByUserId(id)}
        </Typography>
      </UserProfile>
    </button>
  )
}

export default DMTrayPopup
