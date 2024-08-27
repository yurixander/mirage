import IconButton from "@/components/IconButton"
import Input from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import UserProfile from "@/components/UserProfile"
import useInvitationLink from "@/hooks/matrix/useInvitationLink"
import useErrorTooltip from "@/hooks/util/useErrorTooltip"
import {getUsernameByUserId, stringToColor} from "@/utils/util"
import {useState, type FC} from "react"
import {
  IoCheckmark,
  IoCloseCircle,
  IoCopyOutline,
  IoSearch,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-4">
        <DirectChatsPopup />
      </div>
    </>
  )
}

const DirectChatsPopup: FC = () => {
  const [inputValue, setInputValue] = useState("")

  return (
    <section className="max-h-[460px] max-w-xl rounded-md border border-slate-300 md:max-h-[560px]">
      <section className="overflow-hidden rounded-md border border-slate-300">
        <div className="flex justify-between border-b border-slate-300 bg-gray-50 px-6 py-4">
          <Typography variant={TypographyVariant.Heading}>
            Direct Rooms
          </Typography>

          <IconButton tooltip="Close" Icon={IoCloseCircle} onClick={() => {}} />
        </div>

        <div className="flex flex-col gap-2 px-6 py-2">
          <Typography className="text-black">
            Start a conversation with someone using their name or username
            (@username:mirage.org).
          </Typography>

          <Input
            parentValue={inputValue}
            onValueChange={setInputValue}
            Icon={IoSearch}
            placeholder="Enter name or username"
          />

          <RecentConversations
            recentChats={[
              {
                displayName: "Christopher",
                userId: "@chrisXXL@matrix.org",
                roomId: "Test room id",
              },
              {
                displayName: "Christopher",
                userId: "@chrisXXL@matrix.org",
                roomId: "Test room id",
              },
            ]}
          />

          <Typography className="text-black">
            Some suggestions may not be shown for privacy reasons. If you don´t
            find who you´re looking for, send them your invitation link below.
          </Typography>
        </div>

        <div className="flex flex-col gap-2 border-t border-t-slate-300 bg-gray-50 px-6 py-4">
          <Typography className="text-black">INVITATION LINK</Typography>

          <InvitationLinkBar userId="@crissxxl:matrix.org" />
        </div>
      </section>
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

export default DevelopmentPreview
