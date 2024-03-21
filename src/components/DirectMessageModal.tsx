import {useEffect, useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoCheckmark, IoCloseCircle, IoCopyOutline} from "react-icons/io5"
import Input from "./Input"
import UserProfile from "./UserProfile"
import {
  getDirectRoomsIds,
  getPartnerUserIdFromRoomDirect,
  normalizeName,
  stringToColor,
  timeFormatter,
} from "@/utils/util"
import useConnection from "@/hooks/matrix/useConnection"
import useInvitationLink from "@/hooks/matrix/useInvitationLink"
import useUsersSearch from "@/hooks/matrix/useUserSearch"

export type DirectMessageModalProps = {
  onClose: () => void
}

type DirectChatRecentProps = {
  userId: string
  displayName: string
  roomId: string
  lastMsgSentDate?: number
}

const DirectChatRecent: FC<DirectChatRecentProps> = ({
  displayName,
  userId,
  lastMsgSentDate,
}) => {
  return (
    <div className="flex cursor-pointer flex-row items-center rounded-lg p-2 hover:bg-neutral-200">
      <UserProfile
        text={userId}
        displayName={displayName}
        displayNameColor={stringToColor(userId)}
        className="mr-auto"
      />

      {lastMsgSentDate && (
        <Typography variant={TypographyVariant.P}>
          {timeFormatter(lastMsgSentDate)}
        </Typography>
      )}
    </div>
  )
}

const DirectMessageModal: FC<DirectMessageModalProps> = ({onClose}) => {
  const {client} = useConnection()
  const [userId, setUserId] = useState<string | null>(null)
  const [directChats, setDirectChats] = useState<DirectChatRecentProps[]>([])
  const {userToFind, setUserToFind, usersResult} = useUsersSearch(client)

  const {invitationLink, isLinkCopied, copyToClipboard} =
    useInvitationLink(userId)

  useEffect(() => {
    if (client === null) {
      return
    }

    setUserId(client.getUserId())

    const directRoomIds = getDirectRoomsIds(client)
    const directChats: DirectChatRecentProps[] = []

    for (const roomId of directRoomIds) {
      const room = client.getRoom(roomId)
      const lastMsgSentDate = room?.getLastLiveEvent()?.localTimestamp
      const partnerUserId = getPartnerUserIdFromRoomDirect(room)

      if (room === null || partnerUserId === null) {
        continue
      }

      directChats.push({
        roomId: room.roomId,
        userId: partnerUserId,
        displayName: normalizeName(room.name),
        lastMsgSentDate,
      })
    }

    setDirectChats(directChats)
  }, [client])

  return (
    // TODO: Should be pixels value, replace by the future design.
    <div className="flex size-full max-h-[80%] max-w-[50%] flex-col gap-2 rounded-lg bg-neutral-100 p-5 shadow-2xl">
      <div className="flex w-full">
        <Typography variant={TypographyVariant.H3}>Direct messages</Typography>

        <IconButton
          onClick={onClose}
          tooltip="Close"
          Icon={IoCloseCircle}
          className="ml-auto"
          color="gray"
        />
      </div>

      <Typography>
        Start a conversation with someone using their name or username
        (@username:matrix.org).
      </Typography>

      <Input
        className="w-full"
        initialValue={userToFind}
        onValueChange={setUserToFind}
        placeholder="Enter name or username"
      />

      <div className="flex h-full flex-col gap-2 overflow-hidden p-1">
        <Typography variant={TypographyVariant.P}>
          RECENT CONVERSATIONS
        </Typography>

        <div className="flex h-full flex-col gap-1 overflow-y-scroll scrollbar-hide">
          {usersResult === null
            ? directChats.map(directChatProps => (
                <DirectChatRecent {...directChatProps} />
              ))
            : usersResult.map(userProps => (
                <div className="w-full cursor-pointer rounded-lg p-2 hover:bg-neutral-200">
                  <UserProfile {...userProps} />
                </div>
              ))}
        </div>

        <Typography>
          Some suggestions may not be shown for privacy reasons. If you don't
          find who you're looking for, send them your invitation link below.
        </Typography>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="h-[1px] w-full bg-neutral-400" />

        <Typography>INVITATION LINK</Typography>

        <div className="flex flex-row items-center rounded-md border-[1px] border-black p-2">
          <Typography
            variant={TypographyVariant.Span}
            className="text-blue-500">
            {invitationLink ?? "Generating link..."}
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
