/* eslint-disable tailwindcss/enforces-shorthand */
import {type FC} from "react"
import {assert} from "../utils/util"
import {twMerge} from "tailwind-merge"

export type NotificationIndicatorProps = {
  mentionAmount?: number
}

const NotificationIndicator: FC<NotificationIndicatorProps> = ({
  mentionAmount,
}) => {
  if (mentionAmount !== undefined) {
    assert(
      mentionAmount > 0,
      "mention amount should be greater than zero if it's defined"
    )

    assert(
      Number.isInteger(mentionAmount),
      "mention amount should never be a decimal"
    )
  }

  const isMentionClass =
    mentionAmount !== undefined
      ? "h-auto w-auto rounded-5 bg-red px-3px py-6px"
      : "rounded-50 bg-contrastDarker h-10px w-10px"

  const adjustedAmount =
    mentionAmount !== undefined
      ? // If there's too many notifications to display, just show "99+"
        // to avoid overflowing the dot to a larger width.
        mentionAmount > 99
        ? "99+"
        : mentionAmount.toString()
      : undefined

  return (
    <div className="flex h-10px w-10px items-center justify-center">
      <div className={twMerge("inline-block text-contrast", isMentionClass)}>
        {adjustedAmount !== undefined && adjustedAmount}
      </div>
    </div>
  )
}

export default NotificationIndicator
