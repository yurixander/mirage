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
import {useMemo, type FC} from "react"
import {assert} from "../utils/util"
import ChatInput from "./ChatInput"
import IconButton from "./IconButton"
import SmartAction from "./SmartAction"
import TypingIndicator from "./TypingIndicator"
import useActiveRoom, {MessageKind} from "@/hooks/matrix/useActiveRoom"
import ImageMessage, {type ImageMessageProps} from "./ImageMessage"
import TextMessage, {type TextMessageProps} from "./TextMessage"
import EventMessage from "./EventMessage"
import {twMerge} from "tailwind-merge"

export type ChatContainerProps = {
  className?: string
}

const ChatContainer: FC<ChatContainerProps> = ({className}) => {
  const {activeRoom, messages: messageProps, typingUsers} = useActiveRoom()

  const typingUsersElement = useMemo(
    () =>
      typingUsers.map((user, index) => (
        <TypingIndicator
          key={index}
          users={[
            {
              displayName: user,
              color: "#5CC679",
            },
          ]}
        />
      )),
    [typingUsers]
  )

  const messages = useMemo(
    () =>
      messageProps.map((message, index) =>
        message.kind === MessageKind.Text ? (
          <TextMessage key={index} {...(message.data as TextMessageProps)} />
        ) : message.kind === MessageKind.Image ? (
          <ImageMessage key={index} {...(message.data as ImageMessageProps)} />
        ) : (
          <EventMessage key={index} {...message.data} />
        )
      ),
    [messageProps]
  )

  const name = activeRoom?.name ?? " "

  assert(name.length !== 0, "room name should not be empty")

  return (
    <section
      className={twMerge(
        "flex h-screen w-full flex-col gap-4 border-[1px] border-solid border-stone-200",
        className
      )}>
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

      <div
        ref={scrollRef => {
          if (scrollRef === null) {
            return
          }

          scrollRef.scrollTo({
            top: scrollRef.scrollHeight - scrollRef.clientHeight,
            behavior: "smooth",
          })
        }}
        className="ml-4 mr-4 flex max-h-full grow flex-col gap-4 overflow-y-auto scroll-smooth scrollbar-hide">
        {messages}
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

          {typingUsersElement}
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
