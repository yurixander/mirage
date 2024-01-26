import {type FC} from "react"
import "../styles/NotificationDot.sass"

export type NotificationDotProps = {
  children: JSX.Element
  isShowed: boolean
}

const NotificationDot: FC<NotificationDotProps> = ({children, isShowed}) => {
  return (
    <div className="NotificationDot">
      <div className="children">{children}</div>
      {isShowed && <div className="dot" />}
    </div>
  )
}

export default NotificationDot
