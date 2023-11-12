import "../styles/Channel.sass"
import {ReactComponent as HashIcon} from "../../public/icons/hash.svg"
import {ReactComponent as StarIcon} from "../../public/icons/star.svg"
import NotificationDot from "./NotificationDot"
import {assert, trim} from "../util"

export enum ChannelType {
  Text,
  Space
}

export type ChannelProps = {
  name: string
  type: ChannelType
  isActive: boolean
  containsUnreadMessages: boolean
  mentionCount: number
}

export default function Channel(props: ChannelProps) {
  assert(props.name.length !== 0, "channel name should not be empty")

  // Determine CSS class to apply based on the active state of the channel.
  const classNameActive = props.isActive ? "active" : ""
  let icon: JSX.Element

  switch (props.type) {
    case ChannelType.Text: icon = <HashIcon className={"Icon " + classNameActive} />; break
    case ChannelType.Space: icon = <StarIcon className={"Icon " + classNameActive} />; break
  }

  const mentionCountProp = props.mentionCount > 0 ? props.mentionCount : undefined
  const MAX_NAME_LENGTH = 16

  return (
    <div className="Channel">
      {icon}
      <span className={classNameActive}>{trim(props.name, MAX_NAME_LENGTH)}</span>
      {props.containsUnreadMessages && <NotificationDot mentionAmount={mentionCountProp} />}
    </div>
  )
}
