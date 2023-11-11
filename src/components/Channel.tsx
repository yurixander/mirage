import "../styles/Channel.sass"
import { ReactComponent as IconHash } from "../../public/icons/hash.svg";
import NotificationDot from "./NotificationDot";
import { assert, cut, cutName } from "../util";

export type ChannelProps = {
  name: string
  icon: string
  isActive: boolean
  containsUnreadMessages: boolean
  mentionCount: number
}

export default function Channel(props: ChannelProps){
  assert(props.name.length !== 0, "channel name should not be empty")

  // Determine CSS class to apply based on the active state of the channel.
  const classNameActive = props.isActive ? "active" : ""
  const mentionCountProp = props.mentionCount > 0 ? props.mentionCount : undefined

  return (
    <div className="Channel">
      <IconHash className={"IconHash " + classNameActive}/>
      <span className={classNameActive}>{cut(props.name, 16)}</span>
      {props.containsUnreadMessages && <NotificationDot mentionAmount={mentionCountProp}/>}
    </div>
  )
}
