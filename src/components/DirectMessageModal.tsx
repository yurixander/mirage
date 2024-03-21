import {useEffect, useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoCheckmark, IoCloseCircle, IoCopyOutline} from "react-icons/io5"
import Input from "./Input"
import UserProfile from "./UserProfile"
import {stringToColor} from "@/utils/util"
import useConnection from "@/hooks/matrix/useConnection"
import useUserSearch from "@/hooks/matrix/useUserSearch"
import useInvitationLink from "@/hooks/matrix/useInvitationLink"

export type DirectMessageModalProps = {
  onClose: () => void
}

const DirectMessageModal: FC<DirectMessageModalProps> = ({onClose}) => {
  const {connectWithCachedCredentials, client} = useConnection()
  const [userId, setUserId] = useState<string | null>(null)
  const {userToFind, setUserToFind, usersResult} = useUserSearch(client)
  const {invitationLink, isLinkCopied, copyToClipboard} =
    useInvitationLink(userId)

  useEffect(() => {
    void connectWithCachedCredentials()

    if (client === null) {
      return
    }

    setUserId(client.getUserId())
  }, [client, connectWithCachedCredentials])

  return (
    // TODO: Should be pixels value, replace by the future design.
    <div className="flex size-full max-h-[80%] max-w-[50%] flex-col gap-2 rounded-lg bg-neutral-100 p-3 shadow-2xl">
      <div className="flex">
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
        Start a conversation with someone using their name, email, or username.
      </Typography>

      <Input
        className="w-full"
        initialValue={userToFind}
        onValueChange={setUserToFind}
        placeholder="@username:matrix.org"
      />

      <div className="flex flex-col gap-2 p-1">
        <Typography variant={TypographyVariant.P}>
          RECENT CONVERSATIONS
        </Typography>

        {usersResult === null ? (
          <div className="flex cursor-pointer flex-row items-center rounded-lg p-2 hover:bg-neutral-300">
            {/* TODO: Replace this info for real info. */}
            <UserProfile
              text={"@thecrissx:matrix.org"}
              displayName={"Tokyoto"}
              displayNameColor={stringToColor("Tokyoto")}
            />

            {/* TODO: Use real info. */}
            <Typography variant={TypographyVariant.P} className="ml-auto">
              22 days ago
            </Typography>
          </div>
        ) : (
          usersResult.map(userProps => <UserProfile {...userProps} />)
        )}

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
