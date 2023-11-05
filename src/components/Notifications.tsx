import "../styles/Notifications.sass"
import {IconDefinition} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export type Notification = {
  icon: IconDefinition,
  title: string,
  text: string,
}

type Props = {
  notifications: Notification[],
}

export default function Notifications(props: Props) {
  return <div className="Notifications">
    {props.notifications.map((notification, index) =>
      <div key={index} className="notification">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={notification.icon} />
          {" " + notification.title}
        </div>
        <div className="text">{notification.text}</div>
      </div>
    )}
  </div>
}
