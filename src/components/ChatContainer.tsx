import {
  faCircleHalfStroke,
  faCircleInfo,
  faEarthAmerica,
  faEllipsisV,
  faFaceSmile,
  faHashtag,
  faLink,
  faPaperclip,
  faStarOfLife,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useCallback, type FC} from "react"
import "../styles/ChatContainer.sass"
import {assert} from "../utils/util"
import ChatInput from "./ChatInput"
import IconButton from "./IconButton"
import {RoomType} from "./Room"
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"

export type ChatContainerProps = {
  name: string
  text: string
  type: RoomType
  chatComponents: JSX.Element[]
}

const ChatContainer: FC<ChatContainerProps> = ({
  name,
  text,
  type,
  chatComponents,
}) => {
  assert(name.length !== 0, "room name should not be empty")

  const getIcon = useCallback(
    (type: RoomType) => (type === RoomType.Text ? faHashtag : faStarOfLife),
    [type]
  )

  return (
    <section className="ChatContainer">
      <header className="header">
        <div className="title">
          <FontAwesomeIcon icon={getIcon(type)} className="icon" />
          <span className="name">{name}</span>
          <span className="text">{text}</span>
        </div>

        <IconButton
          onClick={() => {
            /* TODO: Handle `info` button click. */
          }}
          tooltip={"Room details"}
          tooltipPlacement={"bottom"}
          icon={faCircleInfo}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `link` button click. */
          }}
          tooltip={"Copy link"}
          tooltipPlacement={"bottom"}
          icon={faLink}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `more` button click. */
          }}
          tooltip={"More actions"}
          tooltipPlacement={"bottom"}
          icon={faEllipsisV}
        />
      </header>
      <div className="chat">{chatComponents}</div>
      <div className="actions">
        <div className="input">
          <div className="buttons">
            <IconButton
              onClick={() => {
                /* TODO: Handle `emoji` button click. */
              }}
              tooltip={"Emoji"}
              tooltipPlacement={"top"}
              icon={faFaceSmile}
            />

            <IconButton
              onClick={() => {
                /* TODO: Handle `attach` button click. */
              }}
              tooltip={"Attach"}
              tooltipPlacement={"top"}
              icon={faPaperclip}
            />
          </div>

          <ChatInput />
        </div>
        <div className="typing">
          <div className="fill" />

          <div className="fill" />

          <TypingIndicator
            users={[
              {
                displayName: "Emerald Branch",
                color: "#5CC679",
              },
            ]}
          />
        </div>
      </div>
      <div className="information">
        <SmartAction
          icon={faStarOfLife}
          text="Quick menu"
          onClick={() => {
            /* TODO: Handle `Quick menu` click. */
          }}
        />

        <SmartAction
          icon={faUniversalAccess}
          text="Accessibility"
          onClick={() => {
            /* TODO: Handle `Accessibility` click. */
          }}
        />

        <SmartAction
          icon={faCircleHalfStroke}
          text="Switch theme"
          onClick={() => {
            /* TODO: Handle `Switch theme` click. */
          }}
        />

        <SmartAction
          icon={faEarthAmerica}
          text="63ms ping"
          onClick={() => {
            /* TODO: Handle `Ping` click. */
          }}
        />
      </div>
    </section>
  )
}

export default ChatContainer
