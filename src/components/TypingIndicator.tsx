import React, {useMemo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {stringToColor} from "@/utils/util"
import Avatar from "boring-avatars"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Text} from "./ui/typography"

export type TypingIndicatorUser = {
  displayName: string
  userId: string
  avatarUrl?: string
}

export type TypingIndicatorProps = {
  users: TypingIndicatorUser[]
}

const MAX_VISIBLE_TYPING_USERS = 3

const TypingIndicator: FC<TypingIndicatorProps> = ({users}) => {
  const {t} = useTranslation()

  const usersLength = users.length
  const verbForm = length > 1 ? t(LangKey.Are) : t(LangKey.Is)

  const who: React.ReactNode = useMemo(() => {
    if (usersLength > MAX_VISIBLE_TYPING_USERS) {
      return t(LangKey.SeveralPeople)
    }

    return users.map((user, index) => (
      <Text className="truncate" key={index} size="2">
        <Text
          size="2"
          weight="semibold"
          style={{color: stringToColor(user.userId)}}>
          {user.displayName}
        </Text>

        {index < usersLength - 2
          ? ", "
          : index === usersLength - 2
            ? t(LangKey.And)
            : ""}
      </Text>
    ))
  }, [t, users, usersLength])

  const typingUserElements = useMemo(() => {
    if (usersLength > MAX_VISIBLE_TYPING_USERS) {
      return
    }

    return users.map((user, index) =>
      user.avatarUrl === undefined ? (
        <div className={index === 1 || index === 2 ? "-ml-2.5" : ""}>
          <Avatar
            key={index}
            size={20}
            name={user.displayName}
            variant="beam"
          />
        </div>
      ) : (
        <img
          className={twMerge(
            "size-5 rounded-full",
            index === 1 || index === 2 ? "-ml-2.5" : ""
          )}
          key={index}
          src={user.avatarUrl}
          alt={`${user.displayName} avatar`}
        />
      )
    )
  }, [users, usersLength])

  const dotClass = "size-2 animate-dot-jump rounded-full bg-neutral-300"

  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex gap-0.5">
        <div className={dotClass} />

        <div className={twMerge(dotClass, "animation-delay-150")} />

        <div className={twMerge(dotClass, "animation-delay-300")} />
      </div>

      <div className="flex">{typingUserElements}</div>

      <Text size="2" className="xs:max-w-80 w-max max-w-none truncate">
        {who} {verbForm} {t(LangKey.Typing)}
      </Text>
    </div>
  )
}

export default TypingIndicator
