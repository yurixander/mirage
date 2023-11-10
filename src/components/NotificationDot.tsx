import "../styles/NotificationDot.sass"

export type NotificationDotProps = {
  amount: number
}

export default function NotificationDot(props: NotificationDotProps) {
  return <div className="NotificationDot">
    {props.amount >= 100 ? "99+" : props.amount}
    </div>
}