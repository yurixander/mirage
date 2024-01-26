import {type FC} from "react"
import "../styles/NotificationIndicator.sass"
import {assert} from "../util"

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

  const classNames = ["indicator"]

  if (mentionAmount !== undefined) {
    classNames.push("mention")
  }

  const adjustedAmount =
    mentionAmount !== undefined
      ? // If there's too many notifications to display, just show "99+"
        // to avoid overflowing the dot to a larger width.
        mentionAmount > 99
        ? "99+"
        : mentionAmount.toString()
      : undefined

  return (
    <div className="NotificationIndicator">
      <div className={classNames.join(" ")}>
        {adjustedAmount !== undefined && adjustedAmount}
      </div>
    </div>
  )
}

export default NotificationIndicator
