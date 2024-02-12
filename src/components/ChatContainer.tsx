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
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"
import useActiveRoom, {MessageKind} from "@/hooks/matrix/useActiveRoom"
import ImageMessage, {type ImageMessageProps} from "./ImageMessage"
import TextMessage, {type TextMessageProps} from "./TextMessage"
import EventMessage from "./EventMessage"

export type ChatContainerProps = {
  name: string
  text: string
  chatComponents: JSX.Element[]
}

const ChatContainer: FC = () => {
  const {activeRoom, messages} = useActiveRoom()

  if (activeRoom === null) {
    // TODO: Handle here when first open App (activeRoom is null), should show a skeleton or empty component
    return
  }

  const chatComponents = messages.map((message, index) =>
    message.kind === MessageKind.Text ? (
      <TextMessage key={index} {...(message.data as TextMessageProps)} />
    ) : message.kind === MessageKind.Image ? (
      <ImageMessage key={index} {...(message.data as ImageMessageProps)} />
    ) : (
      <EventMessage key={index} {...message.data} />
    )
  )

  const name = activeRoom.name

  assert(name.length !== 0, "room name should not be empty")

  return (
    <section className="flex h-screen w-full flex-col gap-4 border-[1px] border-solid border-stone-200">
      <header className="flex items-center gap-4 border-b-[1px] border-solid border-b-stone-200 p-4">
        <div className="flex w-full gap-1">
          <FontAwesomeIcon icon={faHashtag} className="text-purple-500" />

          <span className="text-purple-500">{name}</span>

          {/* <span className="text-stone-600">{text}</span> */}
        </div>

        <IconButton
          onClick={() => {
            /* TODO: Handle `info` button click. */
          }}
          tooltip="Room details"
          icon={faCircleInfo}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `link` button click. */
          }}
          tooltip="Copy link"
          icon={faLink}
        />

        <IconButton
          onClick={() => {
            /* TODO: Handle `more` button click. */
          }}
          tooltip="More actions"
          icon={faEllipsisV}
        />
      </header>

      <div className="ml-4 mr-4 flex max-h-full grow flex-col gap-4 overflow-y-scroll scroll-smooth scrollbar-hide">
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
              icon={faFaceSmile}
            />

            <IconButton
              onClick={() => {
                /* TODO: Handle `attach` button click. */
              }}
              tooltip="Attach"
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
