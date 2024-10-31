import EventMessage from "@/components/EventMessage"
import ImageMessage from "@/components/ImageMessage"
import TextMessage from "@/components/TextMessage"
import UnreadIndicator from "@/components/UnreadIndicator"
import {type FC, useEffect, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {type AnyMessage, MessageKind} from "./hooks/useRoomChat"
import {buildMessageMenuItems} from "@/utils/menu"
import FileMessage from "@/components/FileMessage"
import AudioMessage from "@/components/AudioMessage"
import ReplyMessage from "@/components/ReplyMessage"
import {motion} from "framer-motion"
import EventGroupMessage from "@/components/EventGroupMessage"
import VideoMessage from "@/components/VideoMessage"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"
import {ScrollArea} from "@/components/ui/scroll-area"
import {type ValueState} from "@/hooks/util/useValueState"
import ValueStateHandler from "@/components/ValueStateHandler"

export type ChatMessagesProps = {
  messagesState: ValueState<AnyMessage[]>
  className?: string
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messagesState,
  className,
}) => {
  const {t} = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current && messagesState.status === "success") {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }
  }, [messagesState])

  return (
    <div className={twMerge("flex size-full flex-col gap-4", className)}>
      <ValueStateHandler
        value={messagesState}
        loading={
          // TODO: @lazaroysr96 Dark mode and limit height for MessagesPlaceholder.
          // <MessagesPlaceholder />
          <></>
        }
        error={_error => (
          <ChatMessageTemplate
            title={t(LangKey.MessagesError)}
            subtitle={t(LangKey.MessagesErrorSubtitle)}
          />
        )}>
        {messages => (
          <ScrollArea avoidOverflow ref={scrollContainerRef}>
            <div className="flex-1 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{translateX: -15, opacity: 0.8}}
                  whileInView={{translateX: 0, opacity: 1}}>
                  <AnyMessageHandler
                    isAtTheEnd={index !== messages.length - 1}
                    anyMessage={message}
                    onAuthorClick={(_userId: string) => {
                      throw new Error("Author click function not implemented.")
                    }}
                    onClickImage={(_imgUrl: string) => {
                      throw new Error("Click image function not implemented.")
                    }}
                    onResendMessage={() => {
                      throw new Error(
                        "Resend message function not implemented."
                      )
                    }}
                    onReplyMessage={() => {
                      throw new Error("Reply message function not implemented.")
                    }}
                    onDeleteMessage={() => {
                      throw new Error(
                        "Delete message function not implemented."
                      )
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </ValueStateHandler>
    </div>
  )
}

const ChatMessageTemplate: FC<{title: string; subtitle: string}> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Heading level="h2">{title}</Heading>

      <Text>{subtitle}</Text>
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
          onQuoteMessageClick={_quoteMessageId => {
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
