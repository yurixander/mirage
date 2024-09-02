import {type FC} from "react"
import {Button} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {IoCopy, IoNotifications, IoSearch} from "react-icons/io5"
import Typography, {TypographyVariant} from "@/components/Typography"
import Input from "@/components/Input"
import useErrorTooltip from "@/hooks/util/useErrorTooltip"
import {twMerge} from "tailwind-merge"
import UserProfile from "@/components/UserProfile"
import {stringToColor, getUsernameByUserId} from "@/utils/util"
import {AvatarType} from "@/components/AvatarImage"

export type DMUser = {
  displayName: string
  userId: string
  avatarUrl?: string
}

type DMTrayPopupProps = {
  isLoading: boolean
  dmRooms: DMRoomData[]
  searchResult: DMUser[] | null
  dmRoomClick: (roomId: string) => void
  onResultUserClick: (userId: string) => void
}

const DMTrayPopup: FC<DMTrayPopupProps> = ({
  dmRooms,
  isLoading,
  onResultUserClick,
  dmRoomClick,
  searchResult,
}) => {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger>
        <Button
          className="text-slate-400 hover:text-slate-800"
          variant="ghost"
          size="icon">
          <IoNotifications size={24} />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent asChild side="right">
        <div className="z-50 m-1 flex h-[520px] w-[480px] flex-col gap-3 overflow-hidden rounded-md border border-slate-300 md:h-[620px]">
          <Typography variant={TypographyVariant.Heading}>
            Direct Rooms
          </Typography>

          <div className="flex flex-col gap-2">
            <Typography className="text-black">
              Start a conversation with someone using their name or username
              (@username:mirage.org).
            </Typography>

            <Input
              onValueChange={() => {}}
              Icon={IoSearch}
              placeholder="Enter name or username"
            />

            <div className="flex max-h-72 flex-col gap-1 overflow-y-auto">
              {searchResult === null ? (
                dmRooms.length === 0 ? (
                  <div className="flex h-72 flex-col items-center justify-center">
                    <Typography variant={TypographyVariant.Heading}>
                      Ops you don't have rooms
                    </Typography>

                    <Typography>
                      You can search for users and start a chat
                    </Typography>
                  </div>
                ) : (
                  <>
                    <Typography className="p-2 text-black">
                      RECENT CONVERSATIONS
                    </Typography>

                    <div className="grow overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {dmRooms.map((dmRoom, index) => {
                          return (
                            <DMRoom
                              key={index}
                              dmRoomClick={dmRoomClick}
                              partnerName={dmRoom.partnerName}
                              partnerId={dmRoom.partnerId}
                              roomId={dmRoom.roomId}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </>
                )
              ) : (
                searchResult.map((dmUser, index) => (
                  <button
                    key={index}
                    className="w-full cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    onClick={() => {
                      try {
                        onResultUserClick(dmUser.userId)
                      } catch {
                        // if (!(error instanceof Error)) {
                        //   return
                        // }
                        // TODO: Handle error tooltip here.
                      }
                    }}>
                    <UserProfile
                      avatarType={AvatarType.Profile}
                      displayName={dmUser.displayName}
                      displayNameColor={stringToColor(dmUser.userId)}
                      avatarUrl={dmUser.avatarUrl}>
                      <Typography variant={TypographyVariant.BodySmall}>
                        {dmUser.userId}
                      </Typography>
                    </UserProfile>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <Typography className="text-black">
              Some suggestions may not be shown for privacy reasons. If you
              don´t find who you´re looking for, send them your invitation link
              below.
            </Typography>

            <div className="flex h-10 items-center justify-between rounded border border-neutral-300 bg-neutral-50 px-2">
              <Typography
                variant={TypographyVariant.BodyMedium}
                className="text-blue-600">
                https://matrix.to/#/crissxxl
              </Typography>

              <Button
                className="text-slate-300 hover:bg-transparent hover:text-slate-600"
                variant="ghost"
                size="icon">
                <IoCopy />
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export type DMRoomData = {
  partnerName: string
  partnerId: string
  roomId: string
}

interface DMRoomProps extends DMRoomData {
  dmRoomClick: (roomId: string) => void
  className?: string
}

const DMRoom: FC<DMRoomProps> = ({
  partnerName,
  dmRoomClick,
  partnerId,
  roomId,
  className,
}) => {
  const {showErrorTooltip, renderRef} = useErrorTooltip<HTMLButtonElement>()

  return (
    <button
      ref={renderRef}
      aria-label={`DMChat with ${partnerName}`}
      onClick={() => {
        try {
          dmRoomClick(roomId)
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showErrorTooltip(
            `Failed to open chat room by reason:  ${error.message}`
          )
        }
      }}
      className={twMerge(
        "flex w-full max-w-md cursor-pointer flex-row items-center justify-between rounded-2xl px-3 py-2 hover:bg-gray-100",
        className
      )}>
      <UserProfile
        isSquare={false}
        isNameShorted={false}
        displayName={partnerName}
        displayNameColor={stringToColor(partnerId)}>
        <Typography variant={TypographyVariant.BodySmall}>
          {getUsernameByUserId(partnerId)}
        </Typography>
      </UserProfile>
    </button>
  )
}

export default DMTrayPopup
