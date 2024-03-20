import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoCloseCircle, IoCopyOutline, IoSend} from "react-icons/io5"
import Input from "./Input"
import UserProfile from "./UserProfile"
import {stringToColor} from "@/utils/util"

const DirectMessageModal: FC = () => {
  return (
      <div className="flex h-[80%] w-[50%] flex-col gap-2 rounded-lg bg-neutral-200 p-3">
        <div className="flex">
          <Typography variant={TypographyVariant.H3}>
            Direct messages
          </Typography>

          <IconButton
            onClick={() => {
              // TODO: Handle here close this modal.
            }}
            tooltip={"Close"}
            Icon={IoCloseCircle}
            className="ml-auto"
            color="gray"
          />
        </div>

        <Typography>
          Start a conversation with someone using their name, email, or
          username.
        </Typography>

        {/* TODO: Replace {} for real userId. */}
        <Input
          className="w-full"
          placeholder="Example: { @arturx:matrix.org }"
          actions={[{Icon: IoSend, tooltip: "Search...", onClick: () => {}}]}
        />

        <div className="flex flex-col gap-2 p-1">
          <Typography variant={TypographyVariant.P}>
            RECENT CONVERSATIONS
          </Typography>

          <div className="flex cursor-pointer flex-row items-center rounded-lg p-2 hover:bg-neutral-300">
            {/* TODO: Replace this info for real info. */}
            <UserProfile
              text={"@arturx:matrix.org"}
              displayName={"Arthur"}
              displayNameColor={stringToColor("Arthur")}
            />

            {/* TODO: Use real info. */}
            <Typography variant={TypographyVariant.P} className="ml-auto">
              22 days ago
            </Typography>
          </div>

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

          <Typography>
            Some suggestions may not be shown for privacy reasons. If you don't
            find who you're looking for, send them your invitation link below.
          </Typography>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="h-[1px] w-full bg-neutral-400" />

          <Typography>INVITATION LINK</Typography>

          <div className="flex flex-row items-center rounded-md border-[1px] border-black p-2">
            {/* TODO: Replace for real invitation link. */}
            <Typography
              variant={TypographyVariant.Span}
              className="text-blue-500">
              https://matrix.to/#/@thecriss:matrix.org
            </Typography>

            <IconButton
              className="ml-auto"
              color="black"
              onClick={() => {}}
              tooltip={"Copy to clipboard"}
              Icon={IoCopyOutline}
            />
          </div>
        </div>
      </div>
  )
}

export default DirectMessageModal
