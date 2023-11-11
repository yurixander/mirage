import "../styles/NotificationDot.sass"
import {assert} from "../util"

export type NotificationDotProps = {
  amount: number
}

export default function NotificationDot(props: NotificationDotProps) {
  assert(props.amount >= 0, "amount should never be negative")

  const classNames = ["NotificationDot"]

  if (props.amount !== 0)
    classNames.push("important")

  // If there's too many notifications to display, just show "99+"
  // to avoid overflowing the dot to a larger width.
  const amount = props.amount > 99 ? "99+" : props.amount.toString()

  return (
    <div className={classNames.join(" ")}>
      {props.amount > 0 && amount}
    </div>
  )
}
