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
    mentionAmount === undefined
      ? "rounded-full bg-neutral-300 size-2.5"
      : "size-auto rounded-md bg-red-500 px-[3px] py-[6px]"

  const adjustedAmount =
    mentionAmount === undefined
      ? // If there's too much notifications to display, show "99+"
        // to avoid overflowing the dot to a larger width.
        undefined
      : mentionAmount > 99
        ? "99+"
        : mentionAmount.toString()

  return (
    <div className="flex size-2.5 items-center justify-center">
      <div className={twMerge("inline-block text-neutral-50", isMentionClass)}>
        {adjustedAmount !== undefined && adjustedAmount}
      </div>
    </div>
  )
}

export default NotificationIndicator
