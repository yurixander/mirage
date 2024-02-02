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
import {type FC} from "react"
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

  const icon = type === RoomType.Text ? faHashtag : faStarOfLife

  return (
    <section className="flex h-full flex-col gap-4 border-[1px] border-solid border-stone-200">
      <header className="flex items-center gap-4 border-b-[1px] border-solid border-b-stone-200 p-4">
        <div className="flex w-full gap-1">
          <FontAwesomeIcon icon={icon} className="text-purple-500" />
          <span className="text-purple-500">{name}</span>
          <span className="text-stone-600">{text}</span>
        </div>

        <IconButton
          onClick={() => {
            /* TODO: Handle `info` button click. */
          }}
          tooltip="Room details"
          tooltipPlacement="bottom"
          icon={faCircleInfo}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `link` button click. */
          }}
          tooltip="Copy link"
          tooltipPlacement="bottom"
          icon={faLink}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `more` button click. */
          }}
          tooltip="More actions"
          tooltipPlacement="bottom"
          icon={faEllipsisV}
        />
      </header>
      <div className="ml-4 mr-4 flex grow flex-col gap-4 overflow-hidden overflow-y-scroll scrollbar-hide">
        {chatComponents}
      </div>
      <div className="ml-4 mr-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="mt-[5px] flex h-max gap-3 ">
            <IconButton
              onClick={() => {
                /* TODO: Handle `emoji` button click. */
              }}
              tooltip="Emoji"
              tooltipPlacement="top"
              icon={faFaceSmile}
            />

            <IconButton
              onClick={() => {
                /* TODO: Handle `attach` button click. */
              }}
              tooltip="Attach"
              tooltipPlacement="top"
              icon={faPaperclip}
            />
          </div>

          <ChatInput />
        </div>
        <div className="flex gap-3">
          <div className="h-6 w-6" />

          <div className="h-6 w-6" />

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
      <div className="flex items-center justify-end gap-4 border-t-[1px] border-solid border-t-stone-200 bg-neutral-50 p-[5px]">
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
