import {type FC} from "react"
import {stringToColor, formatTime, cleanDisplayName} from "@/utils/util"
import {twMerge} from "tailwind-merge"
import {type UserPowerLevel} from "@/utils/members"
import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import useTooltip from "@/hooks/util/useTooltip"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {TruncatedHeading, TruncatedText} from "@/components/ui/typography"

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

  const name = displayName.length === 0 ? userId : cleanDisplayName(displayName)

  return (
    <button
      aria-label={`Member: ${name}`}
      ref={renderRef}
      className={twMerge(
        "flex w-full gap-2 rounded-lg px-2 py-1 hover:bg-gray-200 dark:hover:bg-neutral-800",
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
        displayName={name}
        isRounded={false}
      />

      <div className="flex w-full flex-col items-start">
        <TruncatedHeading
          level="h6"
          style={{color: stringToColor(userId)}}
          text={name}
          maxLength={NAME_MAX_LENGTH}
          delayDuration={2000}
        />

        <TruncatedText
          size="2"
          text={lastPresence}
          maxLength={USER_ID_MAX_LENGTH}
          delayDuration={2000}
        />
      </div>
    </button>
  )
}

export default RosterUser
