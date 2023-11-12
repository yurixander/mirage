import "../styles/Channel.sass"
import {ReactComponent as Hash} from "../../public/icons/hash.svg";
import {ReactComponent as Star} from "../../public/icons/star.svg";
import NotificationDot from "./NotificationDot";
import {assert, cut} from "../util";

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
    case ChannelType.Text: icon = <Hash className={"Icon " + classNameActive} />; break
    case ChannelType.Space: icon = <Star className={"Icon " + classNameActive} />; break
  }

  const mentionCountProp = props.mentionCount > 0 ? props.mentionCount : undefined

  return (
    <div className="Channel">
      {icon}
      <span className={classNameActive}>{cut(props.name, 16)}</span>
      {props.containsUnreadMessages && <NotificationDot mentionAmount={mentionCountProp} />}
    </div>
  )
}
