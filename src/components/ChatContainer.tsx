/* eslint-disable tailwindcss/enforces-shorthand */
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
    <section className="flex h-full flex-col gap-x1 border-1 border-solid border-border">
      <header className="flex items-center gap-x1 border-b-1 border-solid border-b-border p-x1">
        <div className="flex w-full gap-5px">
          <FontAwesomeIcon icon={getIcon(type)} className="text-primary" />
          <span className="text-primary">{name}</span>
          <span className="text-grayText">{text}</span>
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
      <div className="ml-x1 mr-x1 flex grow flex-col gap-x1 overflow-hidden overflow-y-scroll scrollbar-hide">
        {chatComponents}
      </div>
      <div className="ml-x1 mr-x1 flex flex-col gap-10px">
        <div className="flex gap-10px">
          <div className="mt-5px flex h-max gap-10px ">
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
        <div className="flex gap-10px">
          <div className="h-fillIcon w-fillIcon" />

          <div className="h-fillIcon w-fillIcon" />

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
      <div className="flex items-center justify-end gap-x1 border-t-1 border-solid border-t-border bg-contrast p-5px">
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
