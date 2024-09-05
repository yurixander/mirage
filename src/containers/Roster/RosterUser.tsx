import {type FC} from "react"
import {stringToColor, formatTime, trim} from "@/utils/util"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "@/components/Typography"
import {type UserPowerLevel} from "@/utils/members"
import {motion} from "framer-motion"
import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useTooltip from "@/hooks/util/useTooltip"

export type RosterUserData = {
  displayName: string
  powerLevel: UserPowerLevel
  userId: string
  lastPresenceAge?: number
  avatarUrl?: string
}

export interface RosterUserProps extends RosterUserData {
  className?: string
  onUserClick: (userId: string) => void
}

const NAME_MAX_LENGTH = 15
const USER_ID_MAX_LENGTH = 20

const RosterUser: FC<RosterUserProps> = ({
  onUserClick,
  lastPresenceAge,
  displayName,
  userId,
  avatarUrl,
  className,
}) => {
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  const lastPresence =
    lastPresenceAge === undefined
      ? "Seen long ago"
      : `Seen ${formatTime(lastPresenceAge)} ago`

  return (
    <motion.button
      aria-label={`Member: ${displayName}`}
      initial={{opacity: 0, scale: 0.5}}
      whileInView={{opacity: 1, scale: 1}}
      ref={renderRef}
      className={twMerge(
        "flex w-full gap-2 rounded-lg px-2 py-1 hover:bg-gray-100",
        className
      )}
      onClick={() => {
        try {
          onUserClick(userId)
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showTooltip(`Failed to open user by: ${error.message}`, true)
        }
      }}>
      <AvatarImage
        avatarUrl={avatarUrl}
        avatarType={AvatarType.Profile}
        displayName="Emerald Branch"
        isRounded={false}
      />

      <div className="flex flex-col items-start">
        <RosterUserTypography
          style={{color: stringToColor(userId)}}
          text={displayName}
          maxLength={NAME_MAX_LENGTH}
        />

        <RosterUserTypography
          variant={TypographyVariant.BodySmall}
          text={lastPresence}
          maxLength={USER_ID_MAX_LENGTH}
        />
      </div>
    </motion.button>
  )
}

const RosterUserTypography: FC<{
  text: string
  maxLength: number
  variant?: TypographyVariant
  style?: React.CSSProperties
}> = ({maxLength, text, style, variant = TypographyVariant.Body}) => {
  const exceedsLimit = text.length > maxLength

  return exceedsLimit ? (
    <TooltipProvider delayDuration={2000}>
      <Tooltip>
        <TooltipTrigger
          aria-label={trim(text, maxLength)}
          className="cursor-default">
          <Typography style={style} variant={variant}>
            {trim(text, maxLength)}
          </Typography>
        </TooltipTrigger>

        <TooltipContent aria-label={text}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Typography style={style} variant={variant}>
      {text}
    </Typography>
  )
}

// return (
//   <motion.div
//     onClick={onUserClick}
//     className={twMerge(
//       "w-full cursor-pointer p-1 hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-2 focus-visible:border-blue-400 focus-visible:outline-none focus-visible:transition focus-visible:duration-150",
//       className
//     )}>
//     <UserProfile
//       avatarUrl={avatarUrl}
//       displayName={displayName}
//       displayNameColor={stringToColor(userId)}
//       isNameShorted>
//       <Typography
//         className="line-clamp-1"
//         variant={TypographyVariant.BodySmall}>
//         {text}
//       </Typography>
//     </UserProfile>
//   </motion.div>
// )

export default RosterUser
