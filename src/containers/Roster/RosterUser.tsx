import {type FC} from "react"
import UserProfile from "../../components/UserProfile"
import {stringToColor, timeFormatter} from "@/utils/util"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "@/components/Typography"

export enum UserPowerLevel {
  Admin = 100,
  Moderator = 50,
  Member = 0,
}

export type RosterUserProps = {
  displayName: string
  powerLevel: UserPowerLevel
  userId: string
  lastPresenceAge?: number
  avatarUrl?: string
  className?: string
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({
  onClick,
  lastPresenceAge,
  displayName,
  userId,
  avatarUrl,
  className,
}) => {
  const text =
    lastPresenceAge === undefined
      ? "Seen long ago"
      : `Seen ${timeFormatter(lastPresenceAge)} ago`

  return (
    <div
      onClick={onClick}
      className={twMerge(
        "w-full cursor-pointer p-1 hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-2 focus-visible:border-outlineTab focus-visible:outline-none focus-visible:transition focus-visible:duration-150",
        className
      )}
      aria-hidden="true">
      <UserProfile
        avatarUrl={avatarUrl}
        displayName={displayName}
        displayNameColor={stringToColor(userId)}
        isNameShorted>
        <Typography
          className="line-clamp-1"
          variant={TypographyVariant.BodySmall}>
          {text}
        </Typography>
      </UserProfile>
    </div>
  )
}

export default RosterUser
