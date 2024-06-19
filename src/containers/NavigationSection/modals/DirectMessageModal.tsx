import {useEffect, useState, type FC} from "react"
import {IoCheckmark, IoCloseCircle, IoCopyOutline} from "react-icons/io5"
import {
  getUsernameByUserId,
  normalizeName,
  stringToColor,
  timeFormatter,
} from "@/utils/util"
import useConnection from "@/hooks/matrix/useConnection"
import useInvitationLink from "@/hooks/matrix/useInvitationLink"
import useUsersSearch from "@/hooks/matrix/useUserSearch"
import {getDirectRoomsIds, getPartnerUserIdFromRoomDirect} from "@/utils/rooms"
import IconButton from "@/components/IconButton"
import Typography, {TypographyVariant} from "@/components/Typography"
import UserProfile from "@/components/UserProfile"
import Input from "@/components/Input"
import useActiveModalStore from "@/hooks/util/useActiveModal"
import {AvatarType} from "@/components/AvatarImage"

type DirectChatRecentProps = {
  userId: string
  displayName: string
  roomId: string
  lastMessageSentDate?: number
}

const DirectChatRecent: FC<DirectChatRecentProps> = ({
  displayName,
  userId,
  lastMessageSentDate,
}) => {
  return (
    <div className="flex cursor-pointer flex-row items-center justify-between rounded-lg p-2 hover:bg-neutral-200">
      <UserProfile
        isNameShorted={false}
        displayName={displayName}
        displayNameColor={stringToColor(userId)}>
        <Typography variant={TypographyVariant.BodySmall}>
          {getUsernameByUserId(userId)}
        </Typography>
      </UserProfile>

      {lastMessageSentDate !== undefined && (
        <Typography variant={TypographyVariant.BodySmall}>
          {timeFormatter(lastMessageSentDate)}
        </Typography>
      )}
    </div>
  )
}

const DirectMessageModal: FC = () => {
  const {client} = useConnection()
  const {clearActiveModal} = useActiveModalStore()
  const [userId, setUserId] = useState<string | null>(null)
  const [directChats, setDirectChats] = useState<DirectChatRecentProps[]>([])
  const {setQuery, results} = useUsersSearch(client)

  const {invitationLink, isLinkCopied, copyToClipboard} =
    useInvitationLink(userId)

  // Initially retrieves all direct chat conversations associated
  // with the current user.
  useEffect(() => {
    if (client === null) {
      return
    }

    setUserId(client.getUserId())

    const directRoomIds = getDirectRoomsIds(client)
    const directChatsProps: DirectChatRecentProps[] = []

    for (const roomId of directRoomIds) {
      const room = client.getRoom(roomId)
      const lastMessageSentDate = room?.getLastLiveEvent()?.localTimestamp

      if (room === null) {
        continue
      }

      directChatsProps.push({
        roomId: room.roomId,
        userId: getPartnerUserIdFromRoomDirect(room),
        displayName: normalizeName(room.name),
        lastMessageSentDate,
      })
    }

    setDirectChats(directChatsProps)
  }, [client])

  return (
    // TODO: Should be pixels value, replace by the future design.
    <div className="flex size-full max-h-[80%] max-w-2xl flex-col justify-between gap-2 rounded-lg bg-white p-5 shadow-2xl">
      <div className="flex w-full justify-between">
        <Typography variant={TypographyVariant.Heading}>
          Direct messages
        </Typography>

        <IconButton
          onClick={clearActiveModal}
          tooltip="Close"
          Icon={IoCloseCircle}
          color="gray"
        />
      </div>

      <Typography variant={TypographyVariant.BodyMedium}>
        Start a conversation with someone using their name or username
        (@username:matrix.org).
      </Typography>

      <Input
        className="w-full"
        onValueChange={setQuery}
        placeholder="Enter name or username"
      />

      <div className="flex h-full flex-col gap-2 overflow-hidden p-1">
        <Typography variant={TypographyVariant.BodyMedium}>
          RECENT CONVERSATIONS
        </Typography>

        <div className="flex h-full flex-col gap-1 overflow-y-scroll">
          {results === null
            ? directChats.map((directChatProps, index) => (
                <DirectChatRecent key={index} {...directChatProps} />
              ))
            : results.map((userProps, index) => (
                <div
                  key={index}
                  className="w-full cursor-pointer rounded-lg p-2 hover:bg-neutral-200">
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

        <Typography variant={TypographyVariant.BodyMedium}>
          Some suggestions may not be shown for privacy reasons. If you don't
          find who you're looking for, send them your invitation link below.
        </Typography>
      </div>

      {/* User direct chat invitation link zone */}
      <div className="flex flex-col gap-2">
        <div className="h-px w-full bg-neutral-400" />

        <Typography variant={TypographyVariant.BodyMedium}>
          INVITATION LINK
        </Typography>

        <div className="flex flex-row items-center rounded-md border border-black p-2">
          <Typography
            variant={TypographyVariant.BodySmall}
            className="text-blue-500">
            {invitationLink ?? "Generating link"}
          </Typography>

          <IconButton
            className="ml-auto"
            color="black"
            onClick={() => {
              // TODO: Show toast when link has been copied.
              void copyToClipboard()
            }}
            tooltip={isLinkCopied ? "Link copied" : "Copy to clipboard"}
            Icon={isLinkCopied ? IoCheckmark : IoCopyOutline}
            isDisabled={userId === null || isLinkCopied}
          />
        </div>
      </div>
    </div>
  )
}

export default DirectMessageModal
