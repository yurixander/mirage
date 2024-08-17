import {type FC} from "react"
import UserProfile from "../../components/UserProfile"
import {stringToColor, formatTime} from "@/utils/util"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "@/components/Typography"
import {type UserPowerLevel} from "@/utils/members"
import {motion} from "framer-motion"

export type RosterUserData = {
  displayName: string
  powerLevel: UserPowerLevel
  userId: string
  lastPresenceAge?: number
  avatarUrl?: string
}

export interface RosterUserProps extends RosterUserData {
  className?: string
  onUserClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({
  onUserClick,
  lastPresenceAge,
  displayName,
  userId,
  avatarUrl,
  className,
}) => {
  const text =
    lastPresenceAge === undefined
      ? "Seen long ago"
      : `Seen ${formatTime(lastPresenceAge)} ago`

  return (
    <motion.div
      initial={{scale: 0.5}}
      whileInView={{scale: 1}}
      onClick={onUserClick}
      className={twMerge(
        "w-full cursor-pointer p-1 hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-2 focus-visible:border-blue-400 focus-visible:outline-none focus-visible:transition focus-visible:duration-150",
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
    </motion.div>
  )
}

export default RosterUser
