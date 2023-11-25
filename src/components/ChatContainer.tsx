import "../styles/ChatContainer.sass"
import {ReactComponent as LinkIcon} from "../../public/icons/link.svg"
import {ReactComponent as InfoIcon} from "../../public/icons/info.svg"
import {ReactComponent as MoreIcon} from "../../public/icons/three-dots.svg"
import {ReactComponent as HashIcon} from "../../public/icons/hash.svg"
import {ReactComponent as StarIcon} from "../../public/icons/star.svg"
import {ReactComponent as AccessibilityIcon} from "../../public/icons/accessibility.svg"
import {ReactComponent as GlobeIcon} from "../../public/icons/globe.svg"
import {ReactComponent as ThemeIcon} from "../../public/icons/theme.svg"
import {ReactComponent as EmojiIcon} from "../../public/icons/emoji.svg"
import {ReactComponent as PaperclipIcon} from "../../public/icons/paperclip.svg"
import IconButton from "./IconButton"
import {RoomType} from "./Room"
import {assert} from "../util"
import BottomSmartAction from "./BottomSmartAction"
import Message, {MessageProps} from "./Message"

export type ChatContainerProps = {
  name: string,
  text: string,
  type: RoomType,
  chatComponents: JSX.Element[]
}

export default function ChatContainer(props: ChatContainerProps) {
  assert(props.name.length !== 0, "room name should not be empty")

  let icon: JSX.Element

  switch (props.type) {
    case RoomType.Text: icon = <HashIcon className="icon" />; break
    case RoomType.Space: icon = <StarIcon className="icon" />; break
  }

  return (
    <div className="ChatContainer">
      <div className="header">
        <div className="title">
          {icon}
          <span className="name">{props.name}</span>
          <span className="text">{props.text}</span>
        </div>
        <IconButton
          onClick={() => {/* TODO: Handle `info` button click. */}}
          tooltip={"Room details"}
          tooltipPlacement={"bottom"}
          icon={InfoIcon} />
        <IconButton
          onClick={() => {/* TODO: Handle `link` button click. */}}
          tooltip={"Copy link"}
          tooltipPlacement={"bottom"}
          icon={LinkIcon} />
        <IconButton
          onClick={() => {/* TODO: Handle `more` button click. */}}
          tooltip={"More actions"}
          tooltipPlacement={"bottom"}
          icon={MoreIcon} />
      </div>
      <div className="chat" >
        {props.chatComponents.map(component => component)}
      </div>
      <div className="actions">
        <IconButton onClick={() => {/* TODO: Handle `emoji` button click. */}}
          tooltip={"Emoji"}
          tooltipPlacement={"top"}
          icon={EmojiIcon} />
        <IconButton onClick={() => {/* TODO: Handle `attach` button click. */}}
          tooltip={"Attach"}
          tooltipPlacement={"top"}
          icon={PaperclipIcon} />
        {/* TODO: Put here Input Component. */}
      </div>
      <div className="information">
        <BottomSmartAction
          icon={StarIcon}
          text="Quick menu"
          onClick={() => { }} />
        <BottomSmartAction
          icon={AccessibilityIcon}
          text="Accessibility"
          onClick={() => { }} />
        <BottomSmartAction
          icon={ThemeIcon}
          text="Switch theme"
          onClick={() => { }} />
        <BottomSmartAction
          icon={GlobeIcon}
          text="63ms ping"
          onClick={() => { }} />
      </div>
    </div>
  )
}
