import {AvatarType} from "@/components/AvatarImage"
import IconButton from "@/components/IconButton"
import Input from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import UserProfile from "@/components/UserProfile"
import useInvitationLink from "@/hooks/matrix/useInvitationLink"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useUsersSearch from "@/hooks/matrix/useUserSearch"
import useErrorTooltip from "@/hooks/util/useErrorTooltip"
import {getDirectRoomsIds, getPartnerUserIdFromRoomDirect} from "@/utils/rooms"
import {stringToColor, getUsernameByUserId, normalizeName} from "@/utils/util"
import {type FC, useEffect, useState} from "react"
import {IoSearch, IoCheckmark, IoCopyOutline} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export const DirectChatsPopup: FC = () => {
  const client = useMatrixClient()
  // TODO: Make matrix user validator.
  const [userId, setUserId] = useState<string>()
  const [directChats, setDirectChats] = useState<DirectChatRecentData[]>([])
  const {setQuery, results} = useUsersSearch(client)

  // Initially retrieves all direct chat conversations associated
  // with the current user.
  useEffect(() => {
    if (client === null) {
      return
    }

    setUserId(client.getUserId() ?? undefined)

    const directRoomIds = getDirectRoomsIds(client)
    const directChatsProps: DirectChatRecentData[] = []

    for (const roomId of directRoomIds) {
      const room = client.getRoom(roomId)

      if (room === null || room.getJoinedMemberCount() !== 2) {
        continue
      }

      directChatsProps.push({
        roomId: room.roomId,
        userId: getPartnerUserIdFromRoomDirect(room),
        displayName: normalizeName(room.name),
      })
    }

    setDirectChats(directChatsProps)
  }, [client])

  return (
    <section className="z-50 max-h-[520px] max-w-xl overflow-auto rounded-md border border-slate-300 bg-white md:max-h-[620px]">
      <div className="overflow-hidden rounded-md border border-slate-300 bg-white">
        <div className="flex border-b border-slate-300 bg-gray-50 px-6 py-4">
          <Typography variant={TypographyVariant.Heading}>
            Direct Rooms
          </Typography>
        </div>

        <div className="flex flex-col gap-2 bg-white px-6 py-2">
          <Typography className="text-black">
            Start a conversation with someone using their name or username
            (@username:mirage.org).
          </Typography>

          <Input
            onValueChange={setQuery}
            Icon={IoSearch}
            placeholder="Enter name or username"
          />

          <div className="max-h-64">
            {results === null ? (
              <RecentConversations recentChats={directChats} />
            ) : (
              <div className="max-h-64 overflow-y-scroll">
                {results.map((userProps, index) => (
                  <div
                    key={index}
                    className="w-full cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                    <UserProfile
                      avatarType={AvatarType.Profile}
                      displayName={userProps.displayName}
                      displayNameColor={stringToColor(userProps.userId)}
                      avatarUrl={userProps.avatarUrl}>
                      <Typography variant={TypographyVariant.BodySmall}>
                        {userProps.userId}
                      </Typography>
                    </UserProfile>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Typography className="text-black">
            Some suggestions may not be shown for privacy reasons. If you don´t
            find who you´re looking for, send them your invitation link below.
          </Typography>
        </div>

        <div className="flex flex-col gap-2 border-t border-t-slate-300 bg-gray-50 px-6 py-4">
          <Typography className="text-black">INVITATION LINK</Typography>

          <InvitationLinkBar userId={userId} />
        </div>
      </div>
    </section>
  )
}

const InvitationLinkBar: FC<{userId?: string}> = ({userId}) => {
  const {invitationLink, isLinkCopied, copyToClipboard, isValidUser} =
    useInvitationLink(userId)

  return (
    <div className="flex flex-row items-center rounded-md border border-slate-300 px-2 py-1">
      <Typography
        variant={TypographyVariant.BodyMedium}
        className="text-blue-500">
        {!isValidUser && invitationLink === null
          ? "User invalid"
          : invitationLink ?? "Generating link"}
      </Typography>

      <IconButton
        iconClassName="text-slate-300 size-4"
        className="ml-auto"
        onClick={copyToClipboard}
        tooltip={isLinkCopied ? "Link copied" : "Copy to clipboard"}
        Icon={isLinkCopied ? IoCheckmark : IoCopyOutline}
        isDisabled={isLinkCopied || !isValidUser}
      />
    </div>
  )
}

const RecentConversations: FC<{
  recentChats: DirectChatRecentData[]
  className?: string
}> = ({recentChats, className}) => {
  return (
    <div className={twMerge("flex h-64 flex-col gap-1", className)}>
      <Typography className="p-2 text-black">RECENT CONVERSATIONS</Typography>

      <div className="grow overflow-y-auto">
        <div className="flex flex-col gap-2">
          {recentChats.map(recentChat => {
            return (
              <DirectChatRecent
                key={recentChat.roomId}
                {...recentChat}
                onClick={function (): void {
                  throw new Error("Implement go to this room.")
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

type DirectChatRecentData = {
  userId: string
  displayName: string
  roomId: string
}

interface DirectChatRecentProps extends DirectChatRecentData {
  onClick: () => void
  className?: string
}

const DirectChatRecent: FC<DirectChatRecentProps> = ({
  displayName,
  userId,
  onClick,
  className,
}) => {
  const {showErrorTooltip, renderRef} = useErrorTooltip<HTMLButtonElement>()

  return (
    <button
      ref={renderRef}
      aria-label={`Chat with ${displayName}`}
      onClick={() => {
        try {
          onClick()
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
        displayName={displayName}
        displayNameColor={stringToColor(userId)}>
        <Typography variant={TypographyVariant.BodySmall}>
          {getUsernameByUserId(userId)}
        </Typography>
      </UserProfile>
    </button>
  )
}

export default DirectChatsPopup
