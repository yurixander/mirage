import "../styles/ChatContainer.sass"
import IconButton from "./IconButton"
import {RoomType} from "./Room"
import {assert} from "../util"
import BottomSmartAction from "./BottomSmartAction"
import TypingIndicator from "./TypingIndicator"
import {
  faPaperclip, faLink, faCircleInfo, faEllipsisV, faFaceSmile, faEarthAmerica, faCircleHalfStroke, faUniversalAccess, faStarOfLife, faHashtag
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export type ChatContainerProps = {
  name: string,
  text: string,
  type: RoomType,
  chatComponents: JSX.Element[]
}

export default function ChatContainer(props: ChatContainerProps) {
  assert(props.name.length !== 0, "room name should not be empty")

  let icon = props.type === RoomType.Text ? faHashtag : faStarOfLife

  return (
    <div className="ChatContainer">
      <div className="header">
        <div className="title">
          <FontAwesomeIcon icon={icon} className="icon" />
          <span className="name">{props.name}</span>
          <span className="text">{props.text}</span>
        </div>
        <IconButton
          onClick={() => {/* TODO: Handle `info` button click. */}}
          tooltip={"Room details"}
          tooltipPlacement={"bottom"}
          icon={faCircleInfo} />
        <IconButton
          onClick={() => {/* TODO: Handle `link` button click. */}}
          tooltip={"Copy link"}
          tooltipPlacement={"bottom"}
          icon={faLink} />
        <IconButton
          onClick={() => {/* TODO: Handle `more` button click. */}}
          tooltip={"More actions"}
          tooltipPlacement={"bottom"}
          icon={faEllipsisV} />
      </div>
      <div className="chat" >
        {props.chatComponents.map(component => component)}
      </div>
      <div className="actions">
        <IconButton onClick={() => {/* TODO: Handle `emoji` button click. */}}
          tooltip={"Emoji"}
          tooltipPlacement={"top"}
          icon={faFaceSmile} />
        <IconButton onClick={() => {/* TODO: Handle `attach` button click. */}}
          tooltip={"Attach"}
          tooltipPlacement={"top"}
          icon={faPaperclip} />
        <div className="input-typing">
          {/* TODO: Put here Input Component. */}
          <TypingIndicator users={[{
            displayName: "Emerald Branch",
            color: "#5CC679"
          }]} />
        </div>
      </div>
      <div className="information">
        <BottomSmartAction
          icon={faStarOfLife}
          text="Quick menu"
          onClick={() => { }} />
        <BottomSmartAction
          icon={faUniversalAccess}
          text="Accessibility"
          onClick={() => { }} />
        <BottomSmartAction
          icon={faCircleHalfStroke}
          text="Switch theme"
          onClick={() => { }} />
        <BottomSmartAction
          icon={faEarthAmerica}
          text="63ms ping"
          onClick={() => { }} />
      </div>
    </div>
  )
}
