import EventMessage from "@/components/EventMessage"
import ImageMessage from "@/components/ImageMessage"
import TextMessage from "@/components/TextMessage"
import Typography, {TypographyVariant} from "@/components/Typography"
import UnreadIndicator from "@/components/UnreadIndicator"
import {type FC, useMemo, useState} from "react"
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
import EventGroupMessage from "@/components/EventGroupMessage"
import VideoMessage from "@/components/VideoMessage"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

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
  const {t} = useTranslation()
  const [imagePrevUrl, setImagePrevUrl] = useState<string>()

  if (messagesState === MessagesState.Loaded) {
    assert(
      messages.length > 0,
      "If you have no messages, your status should be NotMessages."
    )
  }

  const messageElements = useMemo(
    () =>
      messages.map((message, index) => (
        <motion.div
          initial={{translateX: -25, opacity: 0.5}}
          whileInView={{translateX: 0, opacity: 1}}>
          <AnyMessageHandler
            isAtTheEnd={index !== messages.length - 1}
            anyMessage={message}
            onAuthorClick={() => {
              throw new Error("Author click function not implemented.")
            }}
            onClickImage={() => {
              throw new Error("Click image function not implemented.")
            }}
            onResendMessage={() => {
              throw new Error("Resend message function not implemented.")
            }}
            onReplyMessage={() => {
              throw new Error("Reply message function not implemented.")
            }}
            onDeleteMessage={() => {
              throw new Error("Delete message function not implemented.")
            }}
          />
        </motion.div>
      )),
    [messages]
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
            title={t(LangKey.MessagesError)}
            subtitle={t(LangKey.MessagesErrorSubtitle)}
          />
        ) : (
          <ChatMessageTemplate
            title={t(LangKey.NoMessages)}
            subtitle={t(LangKey.NoMessagesSubtitle)}
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

type AnyMessageHandlerProps = {
  isAtTheEnd: boolean
  anyMessage: AnyMessage
  onAuthorClick: (userId: string) => void
  onClickImage: (imgUrl: string) => void
  onResendMessage: () => void
  onReplyMessage: () => void
  onDeleteMessage: () => void
}

const AnyMessageHandler: FC<AnyMessageHandlerProps> = ({
  isAtTheEnd,
  anyMessage,
  onAuthorClick,
  onResendMessage,
  onDeleteMessage,
  onReplyMessage,
  onClickImage,
}) => {
  switch (anyMessage.kind) {
    case MessageKind.Text: {
      return (
        <TextMessage
          key={anyMessage.data.messageId}
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Image: {
      return (
        <ImageMessage
          key={anyMessage.data.messageId}
          {...anyMessage.data}
          onClickImage={onClickImage}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            isMessageError: false,
            isSaveable: true,
            onReplyMessage,
            onResendMessage,
            onSaveContent() {
              open(anyMessage.data.imageUrl)
            },
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Audio: {
      return (
        <AudioMessage
          onAuthorClick={onAuthorClick}
          {...anyMessage.data}
          contextMenuItems={[]}
        />
      )
    }
    case MessageKind.Event: {
      return (
        <EventMessage
          key={anyMessage.data.eventId}
          {...anyMessage.data}
          onFindUser={() => {
            // TODO: Handle find user here.
          }}
          onShowMember={() => {
            // TODO: Handle show member here.
          }}
        />
      )
    }
    case MessageKind.File: {
      return (
        <FileMessage
          key={anyMessage.data.messageId}
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Reply: {
      return (
        <ReplyMessage
          key={anyMessage.data.messageId}
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          onQuoteMessageClick={() => {
            // TODO Handle `onQuoteMessageClick` for `ReplyMessage`
          }}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Unread: {
      return (
        isAtTheEnd && (
          <UnreadIndicator key="unread-indicator" {...anyMessage.data} />
        )
      )
    }
    case MessageKind.EventGroup: {
      return (
        <EventGroupMessage
          eventGroupMainBody={anyMessage.data.eventGroupMainBody}
          eventMessages={anyMessage.data.eventMessages}
          onShowMember={function (): void {
            throw new Error("Show member not implemented.")
          }}
          onFindUser={function (): void {
            throw new Error("Find user not implemented.")
          }}
        />
      )
    }
    case MessageKind.Video: {
      return (
        <VideoMessage
          key={anyMessage.data.messageId}
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          url={anyMessage.data.url}
          contextMenuItems={[]}
        />
      )
    }
  }
}
