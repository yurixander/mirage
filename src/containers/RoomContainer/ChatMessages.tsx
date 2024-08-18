import EventMessage from "@/components/EventMessage"
import ImageMessage from "@/components/ImageMessage"
import TextMessage from "@/components/TextMessage"
import Typography, {TypographyVariant} from "@/components/Typography"
import UnreadIndicator from "@/components/UnreadIndicator"
import {type FC, useCallback, useMemo, useState} from "react"
import MessagesPlaceholder from "./MessagesPlaceholder"
import {assert} from "@/utils/util"
import {twMerge} from "tailwind-merge"
import {type AnyMessage, MessageKind, MessagesState} from "./hooks/useRoomChat"
import {createPortal} from "react-dom"
import ImageModal from "./ImageModal"
import {buildMessageMenuItems} from "@/utils/menu"
import FileMessage from "@/components/FileMessage"
import AudioMessage from "@/components/AudioMessage"
import ReplyMessage from "@/components/ReplyMessage"
import {motion} from "framer-motion"

export type ChatMessagesProps = {
  messages: AnyMessage[]
  messagesState: MessagesState
  className?: string
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messages,
  messagesState,
  className,
}) => {
  const [imagePrevUrl, setImagePrevUrl] = useState<string>()

  if (messagesState === MessagesState.Loaded) {
    assert(
      messages.length > 0,
      "If you have no messages, your status should be NotMessages."
    )
  }

  const onAuthorClick = useCallback((userId: string) => {
    // TODO: Handle `onAuthorClick` for all `Messages`.
  }, [])

  const messageElements = useMemo(
    () =>
      messages.map((message, index) => (
        <motion.div
          initial={{translateX: -25, opacity: 0.5}}
          whileInView={{translateX: 0, opacity: 1}}>
          {message.kind === MessageKind.Text ? (
            <TextMessage
              key={message.data.messageId}
              {...message.data}
              onAuthorClick={onAuthorClick}
              contextMenuItems={buildMessageMenuItems({
                isMessageError: message.data.isDeleted === true,
                canDeleteMessage: message.data.canDeleteMessage === true,
                onReplyMessage() {
                  // TODO: Handle reply
                },
                onResendMessage() {
                  // TODO: Handle resend message here.
                },
                onDeleteMessage() {
                  // deleteMessage(room.client, room.roomId, eventId)
                },
              })}
            />
          ) : message.kind === MessageKind.Reply ? (
            <ReplyMessage
              key={message.data.messageId}
              {...message.data}
              onAuthorClick={() => {
                // TODO: Handle `onAuthorClick` for `TextMessage`.
              }}
              onQuoteMessageClick={quoteMessageId => {
                // TODO Handle `onQuoteMessageClick` for `ReplyMessage`
              }}
              contextMenuItems={buildMessageMenuItems({
                isMessageError: message.data.isDeleted === true,
                canDeleteMessage: message.data.canDeleteMessage === true,
                onReplyMessage() {
                  // TODO: Handle reply
                },
                onResendMessage() {
                  // TODO: Handle resend message here.
                },
                onDeleteMessage() {
                  // deleteMessage(room.client, room.roomId, eventId)
                },
              })}
            />
          ) : message.kind === MessageKind.Image ? (
            <ImageMessage
              key={message.data.messageId}
              {...message.data}
              onClickImage={setImagePrevUrl}
              onAuthorClick={onAuthorClick}
              contextMenuItems={buildMessageMenuItems({
                canDeleteMessage: message.data.canDeleteMessage === true,
                isMessageError: false,
                isSaveable: true,
                onReplyMessage() {
                  // TODO: Handle reply
                },
                onResendMessage() {
                  // TODO: Handle resend message here.
                },
                onSaveContent() {
                  // TODO: Handle image saving here.
                },
                onDeleteMessage() {
                  // deleteMessage(room.client, room.roomId, eventId)
                },
              })}
            />
          ) : message.kind === MessageKind.File ? (
            <FileMessage
              key={message.data.messageId}
              {...message.data}
              onAuthorClick={onAuthorClick}
              contextMenuItems={buildMessageMenuItems({
                isMessageError: message.data.isDeleted === true,
                canDeleteMessage: message.data.canDeleteMessage === true,
                onReplyMessage() {
                  // TODO: Handle reply
                },
                onResendMessage() {
                  // TODO: Handle resend message here.
                },
                onDeleteMessage() {
                  // deleteMessage(room.client, room.roomId, eventId)
                },
              })}
            />
          ) : message.kind === MessageKind.Event ? (
            <EventMessage
              key={message.data.eventId}
              {...message.data}
              onFindUser={() => {
                // TODO: Handle find user here.
              }}
              onShowMember={() => {
                // TODO: Handle show member here.
              }}
            />
          ) : message.kind === MessageKind.Audio ? (
            <AudioMessage
              onAuthorClick={onAuthorClick}
              {...message.data}
              contextMenuItems={[]}
            />
          ) : (
            index !== messages.length - 1 && (
              <UnreadIndicator key="unread-indicator" {...message.data} />
            )
          )}
        </motion.div>
      )),
    [messages, onAuthorClick]
  )

  return (
    <>
      {imagePrevUrl !== undefined &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-modalOverlay">
            <ImageModal
              imageUrl={imagePrevUrl}
              onClose={() => {
                setImagePrevUrl(undefined)
              }}
            />
          </div>,
          document.body
        )}

      <div className={twMerge("flex size-full flex-col gap-4", className)}>
        {messagesState === MessagesState.Loaded ? (
          messageElements
        ) : messagesState === MessagesState.Loading ? (
          <MessagesPlaceholder />
        ) : messagesState === MessagesState.Error ? (
          <ChatMessageTemplate
            title="Messages Error"
            subtitle="An error occurred when obtaining messages from this room."
          />
        ) : (
          <ChatMessageTemplate
            title="No Messages"
            subtitle="Is this room new or has no messages."
          />
        )}
      </div>
    </>
  )
}

const ChatMessageTemplate: FC<{title: string; subtitle: string}> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Typography variant={TypographyVariant.HeadingLarge}>{title}</Typography>

      <Typography>{subtitle}</Typography>
    </div>
  )
}
