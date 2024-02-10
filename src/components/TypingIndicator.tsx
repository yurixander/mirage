import {type FC} from "react"
import Avatar from "./Avatar"
import {twMerge} from "tailwind-merge"

export type TypingIndicatorUser = {
  displayName: string
  color: string
  avatarUrl?: string
}

export type TypingIndicatorProps = {
  users: TypingIndicatorUser[]
}

const TypingIndicator: FC<TypingIndicatorProps> = ({users}) => {
  const verbForm = users.length > 1 ? "are" : "is"

  const names = users.map((user, index, array) => (
    <span key={index}>
      <span className="font-semibold" style={{color: user.color}}>
        {user.displayName}
      </span>

      {index < array.length - 2 ? ", " : ""}

      {index === array.length - 2 ? " and " : ""}
    </span>
  ))

  const MAX_VISIBLE_TYPING_USERS = 3
  const who = users.length > MAX_VISIBLE_TYPING_USERS ? "Several people" : names

  const dotClass =
    "h-[10px] w-[10px] animate-dot-jump rounded-[50%] bg-neutral-300"

  const typingUserElements = users.map(
    (user, index) =>
      user.avatarUrl && (
        <div key={index} className={index === 1 || index === 2 ? "-ml-4" : ""}>
          <Avatar
            isRounded
            displayName={user.displayName}
            avatarUrl={user.avatarUrl}
          />
        </div>
      )
  )

  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex gap-[2px]">
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
