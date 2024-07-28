import {type FC} from "react"
import AvatarImage, {AvatarType} from "./AvatarImage"
import {twMerge} from "tailwind-merge"
import {stringToColor} from "@/utils/util"

export type TypingIndicatorUser = {
  displayName: string
  userId: string
  avatarUrl?: string
}

export type TypingIndicatorProps = {
  users: TypingIndicatorUser[]
}

const TypingIndicator: FC<TypingIndicatorProps> = ({users}) => {
  const verbForm = users.length > 1 ? "are" : "is"

  const names = users.map((user, index, array) => (
    <span key={index}>
      <span
        className="font-semibold"
        style={{color: stringToColor(user.userId)}}>
        {user.displayName}
      </span>

      {index < array.length - 2 ? ", " : ""}

      {index === array.length - 2 ? " and " : ""}
    </span>
  ))

  const MAX_VISIBLE_TYPING_USERS = 3
  const who = users.length > MAX_VISIBLE_TYPING_USERS ? "Several people" : names

  const typingUserElements = users.map(
    (user, index) =>
      user.avatarUrl && (
        <div key={index} className={index === 1 || index === 2 ? "-ml-4" : ""}>
          <div className="size-8 object-contain">
            <AvatarImage
              isRounded
              displayName={user.displayName}
              avatarUrl={user.avatarUrl}
              avatarType={AvatarType.Message}
            />
          </div>
        </div>
      )
  )

  const dotClass = "h-2 w-2 animate-dot-jump rounded-full bg-neutral-300"

  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex gap-0.5">
        <div className={dotClass} />

        <div className={twMerge(dotClass, "animation-delay-150")} />

        <div className={twMerge(dotClass, "animation-delay-300")} />
      </div>

      <div className="flex">{typingUserElements}</div>

      <div>
        {who} {verbForm} typing...
      </div>
    </div>
  )
}

export default TypingIndicator
