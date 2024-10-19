import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Typography, {TypographyVariant} from "@/components/Typography"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useTooltip from "@/hooks/util/useTooltip"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import type {UserPowerLevel} from "@/utils/members"
import {cleanDisplayName, formatTime, stringToColor, trim} from "@/utils/util"
import {motion} from "framer-motion"
import type {FC} from "react"
import type React from "react"
import {twMerge} from "tailwind-merge"

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
  const {t} = useTranslation()
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  const lastPresence =
    lastPresenceAge === undefined
      ? t(LangKey.SeenLongAgo)
      : t(LangKey.LastSeenDate, formatTime(lastPresenceAge))

  return (
    <motion.button
      aria-label={`Member: ${displayName}`}
      initial={{opacity: 0, scale: 0.5}}
      whileInView={{opacity: 1, scale: 1}}
      transition={{
        duration: 0.2,
      }}
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

          showTooltip(t(LangKey.OpenUserError, error.message), true)
        }
      }}>
      <AvatarImage
        className="shrink-0"
        avatarUrl={avatarUrl}
        avatarType={AvatarType.Profile}
        displayName={displayName}
        isRounded={false}
      />

      <div className="flex w-full flex-col items-start">
        <RosterUserTypography
          style={{color: stringToColor(userId)}}
          text={displayName.length === 0 ? userId : displayName}
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
        <TooltipTrigger aria-label={trim(text, maxLength)}>
          <Typography className="w-max" style={style} variant={variant}>
            {cleanDisplayName(trim(text, maxLength))}
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

export default RosterUser
