import "../styles/NotificationDot.sass"
import {assert} from "../util"

export type NotificationDotProps = {
  mentionAmount?: number
}

export default function NotificationDot(props: NotificationDotProps) {
  if (props.mentionAmount !== undefined) {
    assert(props.mentionAmount > 0, "mention amount should be greater than zero if it's defined")
    assert(Number.isInteger(props.mentionAmount), "mention amount should never be a decimal")
  }

  const classNames = ["NotificationDot"]

  if (props.mentionAmount !== undefined)
    classNames.push("mention")

  const adjustedAmount = props.mentionAmount !== undefined
    // If there's too many notifications to display, just show "99+"
    // to avoid overflowing the dot to a larger width.
    ? props.mentionAmount > 99 ? "99+" : props.mentionAmount.toString()
    : undefined

  return (
    <div className={classNames.join(" ")}>
      {adjustedAmount !== undefined && adjustedAmount}
    </div>
  )
}