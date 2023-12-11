import "../styles/ChatContainer.sass"
import IconButton from "./IconButton"
import {RoomType} from "./Room"
import {assert} from "../util"
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"
import {
  faPaperclip, faLink, faCircleInfo, faEllipsisV, faFaceSmile, faEarthAmerica, faCircleHalfStroke, faUniversalAccess, faStarOfLife, faHashtag
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ChatInput from "./ChatInput"

export type ChatContainerProps = {
  name: string,
  text: string,
  type: RoomType,
  chatComponents: JSX.Element[]
}

const getIcon = (type: RoomType) => type === RoomType.Text
  ? faHashtag
  : faStarOfLife

export default function ChatContainer(props: ChatContainerProps) {
  assert(props.name.length !== 0, "room name should not be empty")

  return (
    <section className="ChatContainer">
      <header className="header">
        <div className="title" >
          <FontAwesomeIcon icon={getIcon(props.type)} className="icon" />
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
      </header>
      <div className="chat" >
        {props.chatComponents}
      </div>
      <div className="actions">
        <div className="input">
          <div className="buttons">
            <IconButton onClick={() => {/* TODO: Handle `emoji` button click. */}}
              tooltip={"Emoji"}
              tooltipPlacement={"top"}
              icon={faFaceSmile} />
            <IconButton onClick={() => {/* TODO: Handle `attach` button click. */}}
              tooltip={"Attach"}
              tooltipPlacement={"top"}
              icon={faPaperclip} />
          </div>
          <ChatInput />
        </div>
        <div className="typing">
          <div className="fill" />
          <div className="fill" />
          <TypingIndicator
            users={[{
              displayName: "Emerald Branch",
              color: "#5CC679"
            }]} />
        </div>
      </div>
      <div className="information">
        <SmartAction
          icon={faStarOfLife}
          text="Quick menu"
          onClick={() => { }} />
        <SmartAction
          icon={faUniversalAccess}
          text="Accessibility"
          onClick={() => { }} />
        <SmartAction
          icon={faCircleHalfStroke}
          text="Switch theme"
          onClick={() => { }} />
        <SmartAction
          icon={faEarthAmerica}
          text="63ms ping"
          onClick={() => { }} />
      </div>
    </section>
  )
}
