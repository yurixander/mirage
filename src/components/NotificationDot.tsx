import "../styles/NotificationDot.sass"

export type NotificationDotProps = {
  children: JSX.Element,
  isShowed: boolean
}

export default function NotificationDot(props: NotificationDotProps) {
  return (
    <div className="NotificationDot">
      <div className="children">
        {props.children}
      </div>
      {props.isShowed && <div className="dot" />}
    </div>
  )
}
